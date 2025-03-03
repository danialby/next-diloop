import { Metadata } from "next";
import React from "react";
import Image from "next/image";
import {HorizontalDots} from "@/icons";

type SkillItem = {
    name: string;
    title: string;
    image: string;
    path?: string;
    subItems?: {
        courses: object,
        new?: boolean
    }[];
};

const Skills: SkillItem[] = [
    {
        name:'',
        image: '/images/grid-image/image-01.png',
        title: "بازاریابی دیجیتال",
        path: '#',
    },
    {
        name:'',
        image: '/images/grid-image/image-02.png',
        title: "آموزش Seo",
        path: '#',
    },
    {
        name:'',
        image: '/images/grid-image/image-03.png',
        title: "بازاریابی سنتی",
        path: '#',
    },

    {
        name:'',
        image: '/images/grid-image/image-04.png',
        title: "بازاریابی مدرن",
        path: '#',
    },
];



export const metadata: Metadata = {
    title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
    description:
        "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
    // other metadata
};
export default function page() {
    return (
        <div className={`flex items-center justify-center gap-8 `}>
            { Skills.map((skill, index) => (
                <div key={index} className={`overflow-hidden rounded-2xl  shadow shadow-md bg-gray-50`}>
                    <div className="flex flex-1 flex-col">
                        <Image
                            src={skill.image}
                            alt={skill.title}
                            className="dark:hidden"
                            width={472}
                            height={152}
                        />
                        <div className={`flex flex-row justify-between items-center px-2 py-4 w-full`}>
                            <span>{skill.title}</span>
                            <HorizontalDots/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
