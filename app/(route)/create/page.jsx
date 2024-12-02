"use client"

import React, { useState, useEffect } from 'react'
import SelectOption from './_components/SelectOption'
import { Button } from '@/components/ui/button'
import TopicInput from './_components/TopicInput'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { toast } from 'sonner'
import { ArrowLeft, LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { generateNote } from '@/utils/AIModel'
import { ChapterNotes, Courses, Users } from '@/utils/schema'
import { db } from '@/utils/db'
import { parseStringify } from '@/lib/utils'
import Banner from '@/components/custom/Banner'
import { eq } from 'drizzle-orm'
import Link from 'next/link'

const CreatePage = () => {
    const { user } = useUser();
    const router = useRouter();

    const [step, setStep] = useState(0)
    const [formData, setFormData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [totalCourses, setTotalCourses] = useState(0)

    const handleUserInput = (fieldName, fieldValue) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue,
        }))
    }

    // method to save user input to db and generate ai resposnse from user input
    const generateCourseOutline = async () => {
        const courseId = uuidv4();
        try {
            setIsLoading(true);
            const result = await axios.post('/api/generate-course-outline', {
                courseId: courseId,
                ...formData,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('MM-DD-YYYY')
            })
            if (result) {
                console.log("ai response: ", result?.data?.result?.Courses)
                const courseId = result.data?.result?.Courses?.courseId
                console.log("ai response courseId: ", result?.data?.result?.Courses?.courseId)
                const Chapters = result?.data?.result?.Courses?.courseLayout?.courseChapters
                console.log("ai response course chapters: ", result?.data?.result?.Courses?.courseLayout?.courseChapters)
                let index = 0
                // generate notes for each chapter with ai
                Chapters.forEach(async (chapter) => {
                    //     const PROMPT = `generate exam material detail content for each chapter, make sure to include all topic point in the content, make sure to give content in HTML format (Do not add HTML tag, Head, Body, title tag), the chapters: ${JSON.stringify(chapter)}
                    // }`

                    // const PROMPT = `generate an HTML format discussion about ${chapter?.chapterTitle} ${chapter?.chapterDescription}, and base the discussion on the topics inside ${chapter?.chapterTopics}, return a response in HTML format`

                    const PROMPT = `based on chapter title: ${chapter?.chapterTitle}, chapter description: ${chapter?.chapterDescription}, and based on each and every chapter topic in ${chapter?.chapterTopics} array, make sure to provide detailed discussion for each topic in ${chapter?.chapterTopics}, make sure to return only one property named content that contains the HTML format of the discussion (Do not add HTML tag, Head, Body, title tag), and be cautious on adding escape sequences to avoid error.`
                    const result = await generateNote.sendMessage(PROMPT);
                    const aiResp = parseStringify(result?.response?.text());

                    await db.insert(ChapterNotes).values({
                        courseId: courseId,
                        chapterId: index,
                        notes: aiResp
                    })
                    index = index + 1;
                });

                toast(
                    <p className='text-sm text-green-500 font-bold'>Course generated successfully</p>
                )
                router.replace('/dashboard')
            }
        } catch (error) {
            toast(
                <p className='text-sm text-red-500 font-bold'>Internal error occured while saving course</p>
            )
            console.log('generate ai response error: ', error)
        } finally {
            setIsLoading(false);
        }

    }



    //check if user is subscribed
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
        <>
            {
                ((isSubscribed && totalCourses >= 3) ||
                    (isSubscribed && totalCourses < 3) ||
                    (!isSubscribed && totalCourses < 3)) ? (
                    <>
                        <Link href={'/dashboard'} className='flex items-center gap-1 cursor-pointer p-5 hover:text-gray-500 transition-all'>
                            <ArrowLeft />
                            <p>Back to dashboard</p>
                        </Link>
                        <div className='flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20'>

                            <h2 className='font-bold text-4xl text-primary'>Start Building Your Personal Course</h2>
                            <p className='text-gray-600 text-lg'>Fill all details in order to generate and learn new courses for your future endevour.</p>

                            <div className='mt-10 w-[70%]'>
                                {
                                    step === 0 ? <SelectOption selectedStudyType={(value => handleUserInput("courseType", value))} /> : <TopicInput setTopic={(value) => handleUserInput('topic', value)} setDifficultyLevel={(value) => handleUserInput('difficultyLevel', value)} />
                                }

                            </div>

                            <div className='flex justify-between items-center w-full mt-32'>
                                {step !== 0 ? <Button onClick={() => setStep(prev => prev - 1)} variant="outline">Previous</Button> : " - "}

                                {step === 0 ? <Button onClick={() => setStep(prev => prev + 1)}>Next</Button> : <Button onClick={() => generateCourseOutline()} disabled={isLoading}>{isLoading ? <LoaderCircle className='w-4 h-4 animate-spin' /> : "Generate"}</Button>}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <Banner
                            variant={"warning"}
                            label="It's either you are not subscribed to PRO plan or you reached the limit of your FREE plan"
                        />
                        <div className='flex items-center justify-center h-screen'>
                            <div className='flex md:flex-row flex-col items-center gap-5'>
                                <Link href={'/dashboard'} className='bg-primary hover:bg-primary-100 transition-all font-bold text-white p-3 rounded-lg text-sm px-5 min-w-52 max-w-52 text-center'>Go Back to Dashboard</Link>
                                <Link href={'/dashboard/upgrade'} className='bg-transparent hover:bg-white/10 transition-all font-bold text-black border-black border p-3 rounded-lg text-sm px-5 min-w-52 max-w-52 text-center'>Upgrade Plan</Link>
                            </div>
                        </div>
                    </>
                )
            }

        </>
    )
}

export default CreatePage