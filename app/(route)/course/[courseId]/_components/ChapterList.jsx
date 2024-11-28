import React from 'react'

const ChapterList = async ({ course }) => {
    const chapters = course?.courseLayout?.courseChapters;

    return (
        <div className='mt-5'>
            <h2 className='font-bold text-xl'>Chapters</h2>

            <div className='flex flex-col gap-5 mt-5'>
                {chapters?.map((chapter, index) => (
                    <div key={index} className='flex flex-col shadow-md mb-2 rounded-lg p-5 cursor-pointer'>
                        <h2 className='text-2xl font-bold'>{chapter?.chapterTitle}</h2>
                        <p className='font-medium text-gray-600 text-sm'>{chapter?.chapterSummary}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChapterList