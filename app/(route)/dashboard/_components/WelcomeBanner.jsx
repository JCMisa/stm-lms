"use client"

import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const WelcomeBanner = () => {
    const { user } = useUser()
    return (
        <div className='p-5 bg-primary/70 w-full text-white rounded-lg flex items-center gap-6'>
            <Image src={'/mac-code.webp'} alt='laptop' width={250} height={250} className='h-auto' />
            <div>
                <h2 className='font-bold text-3xl'>Hello, {user?.firstName}</h2>
                <p>Welcome Back! It&apos;s time to get back and learn new course.</p>
            </div>
        </div>
    )
}

export default WelcomeBanner