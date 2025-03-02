"use client";
import React, { useEffect, useRef, useState,useCallback } from "react";

import {
    BoxCubeIcon,
    CalenderIcon,
    ChevronDownIcon,
    GridIcon,
    HorizontaLDots,
    ListIcon,
    PageIcon,
    PieChartIcon,
    PlugInIcon,
    TableIcon,
    UserCircleIcon,
} from "../../icons/index";
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
        percent: 10,
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
        <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar py-8">
            <nav className="mb-6">
                <div className="flex flex-col gap-4">
                    <div className="bg-white p-4 rounded-xl flex flex-col gap-6">
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
                                                <span className={`absolute top-0  bg-blue-200 w-full h-[5px] z-1 
                                                ${item.percent < (part * 10) ? '!translate-x-'+item.percent % (part * 10) : '-translate-x-full'}`}></span>
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
