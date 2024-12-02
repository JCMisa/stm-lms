import React from 'react'
import { db } from '@/utils/db'
import { Courses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import CourseIntroCard from './_components/CourseIntroCard'
import ChapterList from './_components/ChapterList'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const CourseViewPage = async ({ params }) => {
    const courseId = (await params)?.courseId
    const courseList = await db.select().from(Courses).where(eq(Courses.courseId, courseId))
    const course = courseList[0]

    return (
        <div>
            <div className='px-10 mt-10'>
                <Link href={'/dashboard'} className='flex items-center gap-2 cursor-pointer hover:text-gray-500 transition-all'>
                    <ArrowLeft />
                    Back to dashboard
                </Link>
                {/* course intro */}
                <CourseIntroCard course={course} />
                {/* study material options */}
                {/* <StudyMaterialSection /> */}
                {/* chapter list */}
                <ChapterList course={course} />
            </div>
        </div>
    )
}

export default CourseViewPage