"use client"

import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import { CourseCountContext } from '@/app/_context/CourseCountContext'
import { db } from '@/utils/db'
import { Courses, Users } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'

const CourseList = () => {
    const { user } = useUser();

    const [courseList, setCourseList] = useState([])
    const [loading, setLoading] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [totalCourses, setTotalCourses] = useState(0)

    const { setTotalCourse } = useContext(CourseCountContext);

    const getCourseList = async () => {
        setLoading(true);
        const result = await axios.post('/api/courses', { createdBy: user?.primaryEmailAddress?.emailAddress })
        setCourseList(result?.data?.result)
        setLoading(false)
        setTotalCourse(result?.data?.result?.length)
    }

    useEffect(() => {
        user && getCourseList();
    }, [user])

    // check if user is subscribed and how many courses they created
    const isUserSubscribed = async () => {
        const result = await db
            .select()
            .from(Users)
            .where(
                eq(Users?.email, user?.primaryEmailAddress?.emailAddress)
            );

        if (result.length > 0) {
            if (result[0]?.isMember === true) {
                // if yung current user ay true yung isMember property then, 
                setIsSubscribed(true);
            }

        }
    }

    const checkTotalCourses = async () => {
        const result = await db
            .select()
            .from(Courses)
            .where(
                eq(Courses.createdBy, user?.primaryEmailAddress?.emailAddress)
            )

        if (result?.length > 0) {
            setTotalCourses(result?.length)
        }
    }

    useEffect(() => {
        user && isUserSubscribed();
        user && checkTotalCourses();
    }, [user])

    return (
        <div className='mt-10'>
            <div className='flex items-center justify-between'>
                <h2 className='font-bold text-2xl'>Your Courses</h2>
                <div className='block md:hidden'>
                    {
                        ((isSubscribed && totalCourses >= 3) ||
                            (isSubscribed && totalCourses < 3) ||
                            (!isSubscribed && totalCourses < 3)) && (
                            <Link href="/create" className="w-full bg-primary hover:bg-primary-100 transition-all flex items-center justify-center py-3 px-5 rounded-full text-white">+</Link>
                        )
                    }
                </div>
            </div>
            <div className='block md:hidden mt-5'>
                <div className='border p-3 bg-slate-200 rounded-lg'>
                    <h2 className='text-lg mb-2'>Available Credits: {(isSubscribed ? 100 : 3) - totalCourses}</h2>
                    <Progress value={(totalCourses / (isSubscribed ? 100 : 3)) * 100} />
                    <h2 className='text-sm'>{totalCourses} out of {isSubscribed ? 100 : 3} credits used</h2>
                    {!isSubscribed && <Link href={'/dashboard/upgrade'} className='text-primary text-xs mt-3'>Upgrade to create more</Link>}
                </div>
            </div>
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