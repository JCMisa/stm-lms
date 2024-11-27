"use client"

import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import { toast } from 'sonner';
import { db } from './utils/db';
import { Users } from './utils/schema';
import { eq } from 'drizzle-orm';
import axios from 'axios';

const Provider = ({ children }) => {
    const { user } = useUser();

    const saveUser = async () => {
        // check if the user exist
        try {
            const existingUser = await db
                .select()
                .from(Users)
                .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress))
            if (existingUser?.length === 0) {
                // add the user if email not found
                const addUser = await db.insert(Users).values({
                    name: user?.fullName,
                    email: user?.primaryEmailAddress?.emailAddress
                })

                if (addUser) {
                    toast(
                        <p className='text-sm font-bold text-green-500'>User saved successfully</p>
                    )
                }
            }
        } catch (error) {
            console.log("save user error: ", error)
            toast(
                <p className='text-sm font-bold text-red-500'>Internal error occured while saving the user</p>
            )
        }
    }

    useEffect(() => {
        user && saveUser();
    }, [user])

    return (
        <div>
            {children}
        </div>
    )
}

export default Provider