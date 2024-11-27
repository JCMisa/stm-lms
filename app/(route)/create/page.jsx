"use client"

import React, { useState } from 'react'
import SelectOption from './_components/SelectOption'
import { Button } from '@/components/ui/button'

const CreatePage = () => {
    const [step, setStep] = useState(0)

    return (
        <div className='flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20'>
            <h2 className='font-bold text-4xl text-primary'>Start Building Your Personal Study Material</h2>
            <p className='text-gray-600 text-lg'>Fill all details in order to generate and learn new courses for your future endevour.</p>

            <div className='mt-10'>
                {
                    step === 0 ? <SelectOption /> : null
                }

            </div>

            <div className='flex justify-between items-center w-full mt-32'>
                {step !== 0 ? <Button onClick={() => setStep(prev => prev - 1)} variant="outline">Previous</Button> : " - "}

                {step === 0 ? <Button onClick={() => setStep(prev => prev + 1)}>Next</Button> : <Button>Generate</Button>}
            </div>
        </div>
    )
}

export default CreatePage