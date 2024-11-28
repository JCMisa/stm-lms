import { chatSession } from "@/utils/AIModel";
import { db } from "@/utils/db";
import { Courses } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { courseId, topic, courseType, difficultyLevel, createdBy, createdAt } = await req.json();

    // generate course layout using gemini ai
    const PROMPT = `Generate a study material for ${topic} for ${courseType} and level of difficulty will be ${difficultyLevel}, I want properties such as courseTitle which is the title of the course, courseSummary which is the summary of the course, courseChapters which is a list of chapters, chapterSummary which is the summary for each chapter, chapterTopics which is a list of topics in each chapter, all in JSON format`
    const aiResp = await chatSession.sendMessage(PROMPT)
    const aiResult = JSON.parse(aiResp?.response?.text());

    // save the result along with user inputs
    const result = await db.insert(Courses).values({
        courseId: courseId,
        courseType: courseType,
        topic: topic,
        difficultyLevel: difficultyLevel,
        courseLayout: aiResult,
        createdBy: createdBy,
        createdAt: createdAt
    }).returning({ Courses })

    return NextResponse.json({ result: result[0] })
}