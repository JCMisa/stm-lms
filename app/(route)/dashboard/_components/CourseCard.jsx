import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CourseCard = ({ course }) => {
    return (
        <div className="border rounded-lg shadow-md bg-light/70 p-5">
            <div>
                <div className='flex items-center justify-between'>
                    <BookOpen className='w-10 h-20 text-primary-100' />
                    <h2 className='text-[10px] p-1 px-2 rounded-full bg-primary-100 text-white'>{course?.createdAt}</h2>
                </div>
                <h2 className='mt-3 font-medium text-lg line-clamp-1'>{course?.courseLayout?.courseTitle}</h2>
                <p className='text-xs line-clamp-2 text-gray-600 mt-2'>{course?.courseLayout?.courseSummary}</p>

                <div className='mt-3'>
                    <Progress value={10} />
                </div>

                <div className='mt-3 flex justify-end'>
                    <Link href={`/course/${course?.courseId}`}>
                        <Button>
                            View
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CourseCard