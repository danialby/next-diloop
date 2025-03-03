"use client";
import React, { useEffect, useRef, useState,useCallback } from "react";

import {
    ArrowUpIcon,
    BoxCubeIcon,
    CalenderIcon,
    ChevronDownIcon,
    GridIcon, GroupIcon,
    HorizontaLDots,
    ListIcon,
    PageIcon,
    PieChartIcon,
    PlugInIcon,
    TableIcon,
    UserCircleIcon,
} from "../../icons/index";
import Badge from "@/components/ui/badge/Badge";
// import SidebarWidget from "./SidebarWidget";

type KnowledgeItem = {
    title: string;
    key: string;
    icon: React.ReactNode;
    percent: number;
};

const knowledgeItems: KnowledgeItem[] = [
    {
        icon: <GridIcon />,
        key: "UserKnowledge",
        title: "دانش شما",
        percent: 20,
    },
    {
        icon: <GridIcon />,
        key: "SiteKnowledge",
        title: "دانش سایت",
        percent: 50,
    },
]


const KnowledgeCard: React.FC = () => {
    // const renderKnowledgeItems = (
    //     knowledgeItems: KnowledgeItem[],
    //     menuType: "site" | "user"
    // ) => (
    //     <>
    //
    //         <ul className="flex flex-col gap-4">
    //             {knowledgeItems.map((item, index) => (
    //                 <li key={item.key}>
    //                     {
    //                         <div className="flex justify-between">
    //                                                             <span>
    //                             {item.percent} %
    //                                 </span>
    //                             <span>
    //                             {item.title}
    //                                 </span>
    //
    //                         </div>
    //                     }
    //                 </li>
    //             ))}
    //         </ul>
    //     </>
    // );
    const percentState = (percent: number) => {
            return percent === 10
            ? "mr-0"
            : isExpanded
                ? "lg:mr-[290px]"
                : "lg:mr-[70px]";
    }

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6   shadow shadow-md flex flex-col duration-300 ease-linear no-scrollbar font-vazir text-sm">
            <nav>
                <div className="flex flex-col gap-4 ">
                    <div className="bg-white rounded-lg flex flex-col gap-6">
                        {knowledgeItems.map((item, index) => (
                            <>
                                <div className="flex flex-col gap-2" key={index}>
                                    <div className="flex justify-between">
                            <span>
                        {item.title}
                    </span>
                                    <span>
                                {item.percent} %
                                 </span>
                                    </div>
                                    <div className="w-full flex flex-row-reverse justify-between items-center gap-1">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((part) => (
                                            <div
                                                key={part}
                                                className={`z-0 relative h-[5px] flex-1 rounded-full border-0 border-blue bg-gray-100 box-content max-w-1/10 overflow-hidden
                                                 ${item.percent >= (part * 10) && '!bg-blue-400'}`}>
                                            </div>

                                        ))}
                                    </div>
                                </div>

                            </>
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    )
        ;
};

export default KnowledgeCard;
