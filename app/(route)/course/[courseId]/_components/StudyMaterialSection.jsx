import React from 'react'
import MaterialCard from './MaterialCard'

const StudyMaterialSection = () => {
    const materialList = [
        {
            name: 'Notes/Chapters',
            desc: 'Read notes to prepare',
            icon: '/notebook.png',
            path: '/notes'
        },
        {
            name: 'Flashcard',
            desc: 'Flashcard help to remember the concepts',
            icon: '/flashcard.png',
            path: '/flashcards'
        },
        {
            name: 'Quiz',
            desc: 'Great way to test your knowledge',
            icon: '/quiz.png',
            path: '/quiz'
        },
    ]
    return (
        <div className='mt-5'>
            <h2 className='font-bold text-xl'>More Ways to Learn</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-3'>
                {
                    materialList.map((item, index) => (
                        <MaterialCard key={index} item={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default StudyMaterialSection