"use client"

import { Progress } from '@/components/ui/progress'
import { LayoutDashboard, Shield, UserCircle } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { Courses, Users } from '@/utils/schema'
import { db } from '@/utils/db'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'

const Sidebar = () => {
    const { user } = useUser();

    const menuList = [
        {
            name: 'Dashboard',
            icon: LayoutDashboard,
            path: '/dashboard'
        },
        {
            name: 'Upgrade',
            icon: Shield,
            path: '/dashboard/upgrade'
        },
        {
            name: 'Profile',
            icon: UserCircle,
            path: '/dashboard/profile'
        },
    ]

    const pathname = usePathname();
    const router = useRouter();

    const [isSubscribed, setIsSubscribed] = useState(false);
    const [totalCourses, setTotalCourses] = useState(0)

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
        <div className='h-screen shadow-md p-5'>
            <Link href={'/'} className='flex items-center gap-2'>
                <Image src={'/logo.svg'} alt='logo' width={1000} height={1000} className='w-10 h-10' />
                <p className='font-bold text-2xl'>STM <span className='text-primary'>LMS</span></p>
            </Link>

            <div className='mt-10'>
                {
                    ((isSubscribed && totalCourses >= 3) ||
                        (isSubscribed && totalCourses < 3) ||
                        (!isSubscribed && totalCourses < 3)) && (
                        <Link href="/create" className="w-full bg-primary hover:bg-primary-100 transition-all flex items-center justify-center py-3 px-5 rounded-lg text-white">+ Create New</Link>
                    )
                }

                <div className='mt-5'>
                    {
                        menuList.map((menu, index) => (
                            <div onClick={() => router.push(menu.path)} key={index} className={`flex items-center gap-5 p-3 hover:bg-slate-200 rounded-lg cursor-pointer transition-all mt-3 ${pathname === menu.path && "bg-slate-200 shadow-md border border-l-primary rounded-none"}`}>
                                <menu.icon />
                                <h2>{menu.name}</h2>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='border p-3 bg-slate-200 rounded-lg absolute bottom-10 w-[85%]'>
                <h2 className='text-lg mb-2'>Available Credits: {(isSubscribed ? 100 : 3) - totalCourses}</h2>
                <Progress value={(totalCourses / (isSubscribed ? 100 : 3)) * 100} />
                <h2 className='text-sm'>{totalCourses} out of {isSubscribed ? 100 : 3} credits used</h2>
                {!isSubscribed && <Link href={'/dashboard/upgrade'} className='text-primary text-xs mt-3'>Upgrade to create more</Link>}
            </div>
        </div>
    )
}

export default Sidebar