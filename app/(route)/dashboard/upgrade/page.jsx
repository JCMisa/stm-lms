"use client"

import { db } from '@/utils/db'
import { Users } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

const UpgradePage = () => {
    const { user } = useUser();

    const [userDetail, setUserDetail] = useState()

    const getUserDetails = async () => {
        const result = await db.select().from(Users).where(eq(Users.email, user?.primaryEmailAddress?.emailAddress))
        if (result) {
            setUserDetail(result[0])
        }
    }

    useEffect(() => {
        user && getUserDetails();
    }, [user])

    const onCheckoutClick = async () => {
        try {
            const result = await axios.post('/api/payment', {
                user: user
            })

            console.log("payment status: ", result.data)
            window.location.assign(result.data.url)
        } catch (error) {
            console.log("payment error: ", error)
        }
    }

    return (
        <div>
            <section className="text-black rounded-lg body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-black">
                            Pricing
                        </h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Upgrade your plan to enjoy limitless possibilities.
                        </p>
                        <div className="flex mx-auto border-2 border-dark-500 rounded overflow-hidden mt-6">
                            <button className="py-1 px-4 bg-dark-100 text-black focus:outline-none">
                                Free
                            </button>
                            <button className="py-1 px-4 text-gray-600 focus:outline-none">
                                Forever
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap -m-4 mb-3">
                        <div className="p-4  md:w-1/2 w-full">
                            <div className="h-full p-6 rounded-lg border-2 border-primary flex flex-col relative overflow-hidden">
                                <h2 className="text-sm tracking-widest text-gray-600 title-font mb-1 font-medium">
                                    START
                                </h2>
                                <h1 className="text-5xl text-black pb-4 mb-4 border-b border-primary/40 leading-none">
                                    Free
                                </h1>
                                <p className="flex items-center text-gray-600 mb-2">
                                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-light/40 text-gray-600 rounded-full flex-shrink-0">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            className="w-3 h-3"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20 6L9 17l-5-5"></path>
                                        </svg>
                                    </span>
                                    5 courses
                                </p>
                                <p className="flex items-center text-gray-600 mb-2">
                                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-light/40 text-gray-600 rounded-full flex-shrink-0">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            className="w-3 h-3"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20 6L9 17l-5-5"></path>
                                        </svg>
                                    </span>
                                    Unlimited Course Access
                                </p>
                                <button className="flex items-center mt-auto text-white bg-gray-800 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-700 rounded">
                                    Continue
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-4 h-4 ml-auto"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                                <p className="text-xs text-gray-600 mt-3">
                                    Continue with free plan.
                                </p>
                            </div>
                        </div>
                        <div className="p-4  md:w-1/2 w-full">
                            <div className="h-full p-6 rounded-lg border-2 border-primary flex flex-col relative overflow-hidden">
                                <span className="bg-primary text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                                    POPULAR
                                </span>
                                <h2 className="text-sm tracking-widest text-gray-600 title-font mb-1 font-medium">
                                    PRO
                                </h2>
                                <h1 className="text-5xl text-black leading-none flex items-center pb-4 mb-4 border-b border-primary-100">
                                    <span>Php 2500</span>
                                    <span className="text-lg ml-1 font-normal text-gray-600">
                                        /forever
                                    </span>
                                </h1>
                                <p className="flex items-center text-gray-600 mb-2">
                                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            className="w-3 h-3"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20 6L9 17l-5-5"></path>
                                        </svg>
                                    </span>
                                    100 courses limit
                                </p>
                                <p className="flex items-center text-gray-600 mb-2">
                                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            className="w-3 h-3"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20 6L9 17l-5-5"></path>
                                        </svg>
                                    </span>
                                    Unlimited Course Access
                                </p>
                                <p className="flex items-center text-gray-600 mb-2">
                                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            className="w-3 h-3"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20 6L9 17l-5-5"></path>
                                        </svg>
                                    </span>
                                    Unlimited reviewer access
                                </p>
                                <p className="flex items-center text-gray-600 mb-6">
                                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            className="w-3 h-3"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20 6L9 17l-5-5"></path>
                                        </svg>
                                    </span>
                                    Provide app testimonial
                                </p>
                                <button className="flex items-center mt-auto text-white bg-primary border-0 py-2 px-4 w-full focus:outline-none hover:bg-primary-100 rounded" onClick={() => onCheckoutClick()} disabled={userDetail?.isMember}>
                                    {userDetail?.isMember === true ? "Active Plan" : "Get Started"}
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-4 h-4 ml-auto"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                                <p className="text-xs text-gray-600 mt-3">
                                    Continue with PRO plan and enjoy more features.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default UpgradePage