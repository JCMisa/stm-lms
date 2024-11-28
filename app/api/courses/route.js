import { db } from "@/utils/db";
import { Courses } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { createdBy } = await req.json();
    // get all the list of courses created by the passed user email
    const result = await db.select().from(Courses).where(eq(Courses.createdBy, createdBy)).orderBy(desc(Courses.id))

    return NextResponse.json({ result: result })
}