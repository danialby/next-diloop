import React from "react";
import AddSubCategoryDialog from "@/components/admin-panel/Categories/AddSubCategory/AddSubCategoryDialog";
import UpdateCategoryDialog from "@/components/admin-panel/Categories/UpdateCategory/UpdateCategoryDialog";
import DeleteCategoryDialog from "@/components/admin-panel/Categories/DeleteCategory/DeleteCategoryDialog";
import {AlignRight, Aperture, CalendarCheck2, SpellCheck, Type} from "lucide-react";
import {toPersianDate, toPersianTime} from "@/utils/dateUtils";
import {IconRenderer} from "@/components/ui/icon-picker";


export function NewDetailsCard({data}) {
    return (
        <div className={`rounded-b-lg col-span-2 overflow-hidden relative`}>
            {/*{ !data &&*/}
            {/*    <div className={`absolute top-0 left-0 w-full h-full bg-white/80 dark:bg-secondary/80 backdrop-blur-[3px] rounded-lg flex items-center justify-center`}>*/}
            {/*        <span className={`font-bold`}>یک دسته بندی را انتخاب کنید...</span>*/}
            {/*    </div>*/}
            {/*}*/}
            <div className={`w-full px-4 flex gap-2`}>
                <AddSubCategoryDialog category={data}/>
                <UpdateCategoryDialog category={data}/>
                <DeleteCategoryDialog category={data}/>
            </div>
            <div className={`flex flex-col gap-4 p-4`}>
                <div className={`flex flex-col col-span-2 gap-y-1 md:gap-y-3 text-xs`}>
                    <span className={`flex items-center`}>
                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-semibold`}> <SpellCheck
                                    className={`w-4 h-4 ml-2`}/>نام انگلیسی :</span>
                                <span className={` text-nowrap`}>{data?.['name_en']}</span>
                                </div>
                            </span>
                    <span className={`flex items-center`}>

                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-semibold`}> <CalendarCheck2
                                    className={`w-4 h-4 ml-2`}/> تاریخ و ساعت :</span>
                                <span className={` text-nowrap`}>
                                    {toPersianDate(data?.['created_at'])} - {toPersianTime(data?.['created_at'])}
                                </span>
                                    </div>
                            </span>
                    <span className={`flex items-center`}>
                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-semibold`}> <AlignRight
                                    className={`w-4 h-4 ml-2`}/>توضیحات :</span>
                                <span className={` text-nowrap`}>{data?.['description']}</span>
                                </div>
                            </span>
                </div>
            </div>
        </div>
    )
}
