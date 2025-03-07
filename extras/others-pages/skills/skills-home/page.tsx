import { Metadata } from "next";
import React from "react";
import Image from "next/image";
import { HorizontalDots } from "../../../../../icons/index";
import SkillCard from "@/components/skills/SkillCard";
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
        <div className={`flex items-center justify-center gap-4 `}>
            { Skills.map((skill, index) => (
                <SkillCard cardData={skill} key={index} />
                    ))}
                </div>
                );
            }
