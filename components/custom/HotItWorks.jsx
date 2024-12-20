import { Activity, ChartSpline, CircleDollarSign } from 'lucide-react'
import React from 'react'

const HowItWorks = () => {
    return (
        <div>
            <section className="text-gray-600 body-font">
                <h2 className='flex justify-center items-center text-3xl pt-24 text-black font-bold'>How it Works?</h2>
                <p className='flex justify-center items-center text-sm text-gray-500 pb-10'>Take control of your finances in just four simple steps.</p>
                <div className="container px-5  mx-auto flex flex-wrap">
                    <div className="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
                        <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                            <div className="h-full w-1 bg-primary pointer-events-none"></div>
                        </div>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-primary-100 text-white relative z-10 title-font font-medium text-sm">1</div>
                        <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                            <div className="flex-shrink-0 w-24 h-24 bg-primary-100 text-white rounded-full inline-flex items-center justify-center">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                                <h2 className="font-medium title-font text-black mb-1 text-xl">Quick and Easy Setup</h2>
                                <p className="leading-relaxed">Sign Up and Log In Create your account using your school credentials and log in to access the STM LMS platform.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
                        <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                            <div className="h-full w-1 bg-primary pointer-events-none"></div>
                        </div>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-primary-100 text-white relative z-10 title-font font-medium text-sm">2</div>
                        <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                            <div className="flex-shrink-0 w-24 h-24 bg-primary-100 text-white rounded-full inline-flex items-center justify-center">
                                <CircleDollarSign className="w-12 h-12" />
                            </div>
                            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                                <h2 className="font-medium title-font text-black mb-1 text-xl">Customize Your Learning Path</h2>
                                <p className="leading-relaxed">Choose your courses and subjects. Our AI will analyze your learning preferences and performance to create a personalized course reviewer just for you.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
                        <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                            <div className="h-full w-1 bg-primary pointer-events-none"></div>
                        </div>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-primary-100 text-white relative z-10 title-font font-medium text-sm">3</div>
                        <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                            <div className="flex-shrink-0 w-24 h-24 bg-primary-100 text-white rounded-full inline-flex items-center justify-center">
                                <ChartSpline className="w-12 h-12" />
                            </div>
                            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                                <h2 className="font-medium title-font text-black mb-1 text-xl">Engage with Interactive Content</h2>
                                <p>Dive into tailored course materials, quizzes, and interactive sessions. Our AI continuously adapts to your learning style, ensuring an engaging and effective study experience.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex relative pb-10 sm:items-center md:w-2/3 mx-auto">
                        <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                            <div className="h-full w-1 bg-primary pointer-events-none"></div>
                        </div>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-primary-100 text-white relative z-10 title-font font-medium text-sm">4</div>
                        <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                            <div className="flex-shrink-0 w-24 h-24 bg-primary-100 text-white rounded-full inline-flex items-center justify-center">
                                <Activity className="w-12 h-12" />
                            </div>
                            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                                <h2 className="font-medium title-font text-black mb-1 text-xl">Track Your Progress and Achievements</h2>
                                <p className="leading-relaxed">Monitor your progress with detailed reports and insights. Celebrate your achievements as you reach your learning goals with STM LMS.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HowItWorks