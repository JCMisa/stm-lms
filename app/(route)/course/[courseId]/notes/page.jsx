"use client"

import { Button } from '@/components/ui/button'
import { parseStringify } from '@/lib/utils'
import { db } from '@/utils/db'
import { ChapterNotes } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ViewChapterNotes = () => {
    const { courseId } = useParams();
    const router = useRouter();

    const [notes, setNotes] = useState([])
    const [stepCount, setStepCount] = useState(0)

    const getNotes = async () => {
        const result = await db.select().from(ChapterNotes).where(eq(ChapterNotes.courseId, courseId))
        setNotes(result);
        console.log("chapter notes: ", result)
    }

    useEffect(() => {
        getNotes();
    }, [courseId])

    const parseContent = (content) => {
        try {
            const parsed = JSON.parse(content); return parsed;
        } catch (error) {
            console.error("Error parsing content:", error); return "Content is invalid";
        }
    };

    return notes?.length > 0 && (
        <div>
            <div className='flex gap-5 items-center'>
                {stepCount !== 0 && <Button variant="outline" size="sm" onClick={() => setStepCount(prev => prev - 1)}>Previous</Button>}
                {notes?.map((item, index) => (
                    <div key={index} className={`w-full h-2 rounded-full ${index < stepCount ? 'bg-primary' : 'bg-gray-200'}`}></div>
                ))}
                <Button size="sm" onClick={() => setStepCount(prev => prev + 1)}>Next</Button>
            </div>

            <div className='my-10'>
                {
                    notes[stepCount] && notes[stepCount].notes ? (
                        <div className='html-ai' dangerouslySetInnerHTML={{ __html: parseContent(notes[stepCount]?.notes)?.content }} />
                    ) : (<p className='text-2xl font-bold'>Conratulations! You&apos;ve Completed the Course 🎉</p>)
                }
                {
                    notes?.length === stepCount && (
                        <div className='flex items-center gap-10 flex-col justify-center mt-20'>
                            <h2 className='text-xs text-gray-600'>End of Notes</h2>
                            <Button onClick={() => router.back()}>Go to Course Page</Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ViewChapterNotes