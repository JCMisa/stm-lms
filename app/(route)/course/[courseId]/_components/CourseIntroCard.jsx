import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CourseIntroCard = ({ course }) => {
    return (
        <div className='flex gap-5 items-center p-10 border shadow-md rounded-lg'>
            <Image src={'/knowledge.png'} alt='icon' width={70} height={70} />
            <div>
                <h2 className='font-bold text-2xl'>{course?.courseLayout?.courseTitle}</h2>
                <p>{course?.courseLayout?.courseSummary}</p>
                <Progress className="mt-3" />

                <div className='flex items-center justify-between mt-3'>
                    <h2 className=' text-lg text-primary'>Total Chapters: {course?.courseLayout?.courseChapters?.length}</h2>
                    <Link href={`/course/${course?.courseId}/notes`}><Button>Start</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default CourseIntroCard