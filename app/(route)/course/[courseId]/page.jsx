import React from 'react'
import { db } from '@/utils/db'
import { Courses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import CourseIntroCard from './_components/CourseIntroCard'
import ChapterList from './_components/ChapterList'

const CourseViewPage = async ({ params }) => {
    const courseId = (await params)?.courseId
    const courseList = await db.select().from(Courses).where(eq(Courses.courseId, courseId))
    const course = courseList[0]

    return (
        <div>
            <div className='px-10 mt-10'>
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