"use client"

import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Shield, UserCircle } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link'

const Sidebar = () => {
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

    return (
        <div className='h-screen shadow-md p-5'>
            <div className='flex items-center gap-2'>
                <Image src={'/logo.svg'} alt='logo' width={1000} height={1000} className='w-10 h-10' />
                <p className='font-bold text-2xl'>STM <span className='text-primary'>LMS</span></p>
            </div>

            <div className='mt-10'>
                <Button className="w-full">+ Create New</Button>

                <div className='mt-5'>
                    {
                        menuList.map((menu, index) => (
                            <div key={index} className={`flex items-center gap-5 p-3 hover:bg-slate-200 rounded-lg cursor-pointer transition-all mt-3 ${pathname === menu.path && "bg-slate-200 shadow-md border border-l-primary rounded-none"}`}>
                                <menu.icon />
                                <h2>{menu.name}</h2>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='border p-3 bg-slate-200 rounded-lg absolute bottom-10 w-[85%]'>
                <h2 className='text-lg mb-2'>Available Credits: 5</h2>
                <Progress value={33} />
                <h2 className='text-sm'>1 out of 5 credits used</h2>
                <Link href={'/dashboard/upgrade'} className='text-primary text-xs mt-3'>Upgrade to create more</Link>
            </div>
        </div>
    )
}

export default Sidebar