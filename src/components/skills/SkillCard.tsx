import Image from "next/image";
import {HorizontalDots} from "@/icons";
import React from "react";

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
interface SkillCardProps {
    cardData: SkillItem;
}


const SkillCard : React.FC<SkillCardProps> = ({ cardData}) => {
return (
<div className={`overflow-hidden rounded-lg  shadow shadow-md bg-gray-50 dark:bg-black`}>
    <div className="flex flex-1 flex-col">
        <Image
            src={cardData.image}
            alt={cardData.title}
            width={472}
            height={152}
        />
        <div className={`flex flex-row justify-between items-center px-3 py-4 w-full`}>
            <span className={`text-xs`}>{cardData.title}</span>
            <HorizontalDots />
        </div>
    </div>
</div>
)
}

export default SkillCard;