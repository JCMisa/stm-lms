"use client";

import Image from "next/image";
import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";

const Header = () => {
    const { isSignedIn } = useUser();

    return (
        <div className="p-5 flex justify-between items-center border shadow-md">
            <Link href={'/'}>
                <div className="flex items-center gap-2 cursor-pointer">
                    <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
                    <p className="text-xl font-bold sm:block hidden">STM <span className="text-primary">LMS</span></p>
                </div>
            </Link>
            {isSignedIn ? (
                <UserButton />
            ) : (
                <Link href={"/dashboard"}>
                    <Button>Get Started</Button>
                </Link>
            )}
        </div>
    );
};

export default Header;