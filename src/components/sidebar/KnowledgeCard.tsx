"use client";
import {
    GridIcon
} from "../../icons/index";
import { JSX } from 'react'

const knowledgeItems: ({
    icon: JSX.Element;
    title: string;
    percent: number;
    key: string
})[] = [
    {
        title: 'دانش شما',
        key: 'UserKnowledge',
        icon: <GridIcon />,
        percent: 22,
    },
    {
        title: "دانش سایت",
        key: "SiteKnowledge",
        icon: <GridIcon />,
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
    return (
        <div className="rounded-2xl border border-gray-200 bg-white  dark:bg-white/[0.03]  p-5 dark:border-gray-800 md:p-6   shadow shadow-md flex flex-col duration-300 ease-linear no-scrollbar font-vazir text-sm">
            <nav>
                <div className="flex flex-col gap-4 ">
                    <div className="rounded-lg flex flex-col gap-6">
                        {knowledgeItems.map((item) => (
                            <div className="flex flex-col gap-2" key={item.key}>
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
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    )
        ;
};

export default KnowledgeCard;
