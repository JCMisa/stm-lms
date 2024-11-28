"use client"

import React, { useState } from 'react'
import SelectOption from './_components/SelectOption'
import { Button } from '@/components/ui/button'
import TopicInput from './_components/TopicInput'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

const CreatePage = () => {
    const { user } = useUser();
    const router = useRouter();

    const [step, setStep] = useState(0)
    const [formData, setFormData] = useState([])
    const [isLoading, setIsLoading] = useState(false);

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
                toast(
                    <p className='text-sm text-green-500 font-bold'>Course Layout Generated Successfully</p>
                )
                router.replace('/dashboard')
            }
        } catch (error) {
            toast(
                <p className='text-sm text-red-500 font-bold'>Internal error occured while saving course</p>
            )
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className='flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20'>
            <h2 className='font-bold text-4xl text-primary'>Start Building Your Personal Study Material</h2>
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
    )
}

export default CreatePage