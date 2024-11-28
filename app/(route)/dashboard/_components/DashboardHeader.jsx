import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const DashboardHeader = () => {
    return (
        <div className='p-5 shadow-md flex justify-between items-center'>
            <Link href={'/'} className='flex items-center gap-2'>
                <Image src={'/logo.svg'} alt='logo' width={30} height={30} />
                <h2 className='text-lg font-bold'>STM <span className='text-primary'>LMS</span></h2>
            </Link>
            <UserButton />
        </div>
    )
}

export default DashboardHeader