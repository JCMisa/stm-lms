"use client"

import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard'

const CourseList = () => {
    const { user } = useUser();
    const [courseList, setCourseList] = useState([])

    const getCourseList = async () => {
        const result = await axios.post('/api/courses', { createdBy: user?.primaryEmailAddress?.emailAddress })
        setCourseList(result?.data?.result)
    }

    useEffect(() => {
        user && getCourseList();
    }, [user])

    return (
        <div className='mt-10'>
            <h2 className='font-bold text-2xl'>Your Courses</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5'>
                {
                    courseList?.length > 0 ? (
                        courseList?.map((course) => (
                            <CourseCard key={course?.id} course={course} />
                        ))
                    ) : (
                        <p className='text-sm text-gray-500 flex items-center justify-center mt-10'>No Courses Available.</p>
                    )
                }
            </div>
        </div>
    )
}

export default CourseList