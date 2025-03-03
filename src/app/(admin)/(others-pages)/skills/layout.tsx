"use client";
import React, {useState} from "react";
import SkillsBreadCrumb from "@/components/skills/SkillsBreadCrumb";
import SearchBar from "@/components/skills/SearchBar";
import MultiSelect from "@/components/form/MultiSelect";
import { useGlobalStore } from '@/store/globalStore';


const multiOptions = [
    { value: "1", text: "همه", selected: true },
    { value: "2", text: "کسب و کار بزرگ", selected: false },
    { value: "3", text: "متوسط", selected: false },
    { value: "4", text: "کوچک", selected: false },
    { value: "5", text: "خانگی", selected: false },
];

export default function SkillsLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {

    const { coursePageTitle } = useGlobalStore();

    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    return (
        <div className={`w-full flex flex-col gap-3 font-vazir`} >
            <div className="flex flex-row justify-between">
                <SearchBar />
                <div className="">
                    <MultiSelect label={''} options={multiOptions} onChange={(values) => setSelectedValues(values)}/>
                    <p className="sr-only">
                        Selected Values: {selectedValues.join(", ")}
                    </p>
                </div>
            </div>
            <div
                className={`w-full bg-white rounded-2xl shadow shadow-md p-6`}
            >
                <SkillsBreadCrumb pageTitle={coursePageTitle} />
                {/* Skills Page Content */}
                <div className={`p-4 mx-auto md:p-6 left-0`}>{children}</div>
            </div>
        </div>
    );
}
