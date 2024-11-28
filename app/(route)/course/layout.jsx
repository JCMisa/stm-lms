import React from 'react'
import DashboardHeader from '../dashboard/_components/DashboardHeader'

const CourseViewLayout = ({ children }) => {
    return (
        <div>
            <DashboardHeader />
            <div className='mx-10 md:mx-36 lg:mx-44 mt-10'>{children}</div>
        </div>
    )
}

export default CourseViewLayout