import React from "react";
import AddSubCategoryDialog from "@/components/admin-panel/Categories/AddSubCategory/AddSubCategoryDialog";
import UpdateCategoryDialog from "@/components/admin-panel/Categories/UpdateCategory/UpdateCategoryDialog";
import DeleteCategoryDialog from "@/components/admin-panel/Categories/DeleteCategory/DeleteCategoryDialog";
import {AlignRight, Aperture, CalendarCheck2, SpellCheck, Type} from "lucide-react";
import {toPersianDate, toPersianTime} from "@/utils/dateUtils";


export function DetailsCard({data}) {
   return (
    <div className={`border rounded-lg col-span-2 bg-gray-50 dark:bg-secondary overflow-hidden relative shadow shadow-lg`}>
        { !data &&
            <div className={`absolute top-0 left-0 w-full h-full bg-white/80 dark:bg-secondary/80 backdrop-blur-[3px] rounded-lg flex items-center justify-center`}>
            <span className={`font-bold`}>یک دسته بندی را انتخاب کنید...</span>
        </div>
        }
        <div className={`w-full border-b-1 justify-center py-2 md:py-3 px-4 flex gap-2 bg-cyan-800 dark:bg-cyan-800 ${!data && '!bg-gray-200'}`}>
            <AddSubCategoryDialog category={data}/>
            <UpdateCategoryDialog category={data}/>
            <DeleteCategoryDialog category={data}/>
        </div>
        <div className={`flex flex-col gap-4 p-4`}>
            <div className={`flex flex-col col-span-2 gap-y-1 md:gap-y-3`}>
                            <span className={`flex items-center`}>
                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-semibold`}> <Type className={`w-6 h-6 ml-2`}/>عنوان :</span>
                                <span className={` text-nowrap`}>{data?.['name_fa']}</span>
                                </div>
                            </span>
                <span className={`flex items-center`}>
                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-semibold`}> <SpellCheck
                                    className={`w-6 h-6 ml-2`}/>نام انگلیسی :</span>
                                <span className={` text-nowrap`}>{data?.['name_en']}</span>
                                </div>
                            </span>
                <span className={`flex items-center`}>

                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-semibold`}> <CalendarCheck2
                                    className={`w-6 h-6 ml-2`}/> تاریخ و ساعت :</span>
                                <span className={` text-nowrap`}>
                                    {toPersianDate(data?.['created_at'])} - {toPersianTime(data?.['created_at'])}
                                </span>
                                    </div>
                            </span>
                <span className={`flex items-center`}>
                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-semibold`}> <AlignRight
                                    className={`w-6 h-6 ml-2`}/>توضیحات :</span>
                                <span className={` text-nowrap`}>{data?.['description']}</span>
                                </div>
                            </span>
            </div>
            <hr className={`dark:border-secondary-foreground`}/>
            <div className={`flex flex-col items-center col-span-1`}>
                <div className={`flex gap-2`}>
                                        <span className={`flex text-nowrap font-semibold`}> <Aperture
                                            className={`w-6 h-6 ml-2`}/>آیکون :</span>
                    <span className={` text-nowrap`}>{data?.['icon_name'] || 'آیکون ندارد'}</span>
                </div>
            </div>
        </div>
    </div>
   )
}
