
"use client";

import { CourseCountContext } from "@/app/_context/CourseCountContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { db } from "@/utils/db";
import { Users } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const UsageTrack = () => {
    const { user } = useUser();
    const router = useRouter();

    const { totalCourse, setTotalCourse } = useContext(CourseCountContext);
    const [maxCourse, setMaxCourse] = useState(5);

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
                setUserSubscription(true);
                setMaxCourse(1000);
            }

        }
    };

    const getTotalUsage = async () => {
        const result = await db
            .select()
            .from(CourseList)
            .where(
                eq(
                    CourseList?.createdBy,
                    user?.primaryEmailAddress?.emailAddress
                )
            );

        if (result) {
            setTotalCourse(result.length);
        }
    };

    useEffect(() => {
        user && getTotalUsage();
        user && isUserSubscribed();
    }, [user]);

    return (
        <div className="m-5 w-full">
            <div className="bg-dark-100 text-white rounded-lg p-3">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-medium">Credits</h2>
                    <Button
                        variant={"outline"}
                        size={"sm"}
                        className="text-primary-100 border-primary-100 hover:bg-dark-100 hover:text-primary-100"
                        onClick={() => getTotalUsage()}
                    >
                        Refresh
                    </Button>
                </div>

                <Progress value={(totalCourse / maxCourse) * 100} />
                <h2 className="text-xs my-2">
                    {totalCourse}/{maxCourse} credits used
                </h2>
            </div>
            <Button
                onClick={() => router.push("/dashboard/upgrade")}
                className="w-full my-3"
            >
                Upgrade
            </Button>
        </div>
    );
};

export default UsageTrack;