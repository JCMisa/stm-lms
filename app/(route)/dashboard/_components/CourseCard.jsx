import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import React from 'react'

const CourseCard = ({ course }) => {
    return (
        <div className="border rounded-lg shadow-md bg-light/70 p-5">
            <div>
                <div className='flex items-center justify-between'>
                    <Image src={'/knowledge.png'} alt='other' width={50} height={50} />
                    <h2 className='text-[10px] p-1 px-2 rounded-full bg-primary-100 text-white'>{course?.createdAt}</h2>
                </div>
                <h2 className='mt-3 font-medium text-lg line-clamp-1'>{course?.courseLayout?.courseTitle}</h2>
                <p className='text-xs line-clamp-2 text-gray-600 mt-2'>{course?.courseLayout?.courseSummary}</p>

                <div className='mt-3'>
                    <Progress value={10} />
                </div>

                <div className='mt-3 flex justify-end'>
                    <Button>
                        View
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CourseCard