import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
    return (
        <section className="flex flex-col items-center">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Unlock <span className="text-secondary">Limitless</span>
                        <strong className="font-extrabold sm:block">
                            {" "}
                            <span className="text-secondary">Learning</span> at STM <span className="text-primary">LMS</span>{" "}
                        </strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed">
                        Revolutionizing Learning at St. Therese Montessori School with AI-Powered Personalized Course Reviewers
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link href={"/dashboard"}>
                            <Button
                                className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-light shadow hover:bg-primary-100 focus:outline-none focus:ring active:bg-primary sm:w-auto"
                                href="#"
                            >
                                Get Started
                            </Button>
                        </Link>

                        <Link href={"#"}>
                            <Button
                                className="block w-full rounded px-12 py-3 text-sm font-medium text-light bg-primary/40 shadow hover:text-white focus:outline-none focus:ring active:text-primary sm:w-auto"
                                href="#"
                            >
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <Image
                src={"/dashboard-icon.png"}
                alt="dashboard-img"
                width={1000}
                height={1000}
                className="-mt-9 rounded-xl border-2"
            />
        </section>
    );
};

export default Hero;