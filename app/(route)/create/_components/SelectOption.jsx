import Image from 'next/image'
import React, { useState } from 'react'

const SelectOption = () => {
    const options = [
        {
            name: 'Exam',
            icon: "/notebook.png"
        },
        {
            name: 'Music',
            icon: "/music.png"
        },
        {
            name: 'Health',
            icon: "/practice.png"
        },
        {
            name: 'Coding Prep',
            icon: "/code.png"
        },
        {
            name: 'Other',
            icon: "/knowledge.png"
        },
    ]

    const [selectedOption, setSelectedOption] = useState()

    return (
        <div className='mt-2'>
            <h2 className='text-center mb-2 text-lg'>Select the category you want to learn with</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5'>
                {options.map((option, index) => (
                    <div key={index} className={`p-4 flex flex-col items-center justify-center border rounded-xl hover:border-primary cursor-pointer transition-all ${option.name === selectedOption && "border-primary"}`} onClick={() => setSelectedOption(option.name)}>
                        <Image src={option.icon} alt={option.name} width={50} height={50} />
                        <h2 className='text-sm'>{option.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectOption