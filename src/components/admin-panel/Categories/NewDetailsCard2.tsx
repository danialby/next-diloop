import React from "react";
import AddSubCategoryDialog from "@/components/admin-panel/Categories/AddSubCategory/AddSubCategoryDialog";
import UpdateCategoryDialog from "@/components/admin-panel/Categories/UpdateCategory/UpdateCategoryDialog";
import DeleteCategoryDialog from "@/components/admin-panel/Categories/DeleteCategory/DeleteCategoryDialog";
import {AlignRight, CalendarCheck2, SpellCheck, Type} from "lucide-react";
import {toPersianDate, toPersianTime} from "@/utils/dateUtils";
import {IconRenderer} from "@/components/ui/icon-picker";


export function NewDetailsCard2({data}) {
    return (
        <div className={`border rounded-lg col-span-2 bg-gray-50 dark:bg-secondary overflow-hidden relative shadow shadow-lg my-2 w-2/3 min-h-25`}>
            <div className={`w-12.5 h-full absolute left-0 top-0 justify-center items-center py-2 md:py-3 px-4 flex flex-col gap-2 bg-black`}>
                <div className={`flex flex-col scale-[0.85] gap-2`}>
                    <AddSubCategoryDialog category={data}/>
                    <UpdateCategoryDialog category={data}/>
                    <DeleteCategoryDialog category={data}/>
                </div>
            </div>
            <div className={`flex flex-col gap-2 p-4 text-xs`}>
                <div className={`flex md:grid flex-col grid-cols-2 gap-y-1 md:gap-y-3`}>
                            <span className={`flex items-center`}>
                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-semibold`}> <Type className={`w-4 h-4 ml-2`}/>عنوان :</span>
                                <span className={` text-nowrap`}>{data?.['name_fa']}</span>
                                </div>
                            </span>
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
                </div>
                <hr className={`dark:border-secondary-foreground`}/>
                <div className={`flex flex-col md:flex-row col-span-1 gap-2 md:gap-4`}>
                    <div className={`flex gap-2 items-center `}>
                        <span className={`flex text-nowrap font-semibold`}>آیکون :</span>
                        <span className={` text-nowrap`}>
                        { data?.settings && data?.settings[0]?.['icon_name'] ?
                            <div className={`p-2 rounded-lg bg-black text-white`}>
                                <IconRenderer name={data?.settings[0]?.['icon_name']} />
                            </div>
                            :
                            'آیکون ندارد'}
                    </span>
                    </div>
                    <span className={`flex items-center`}>
                                <div className={`flex gap-2 items-center`}>
                                <span className={`flex text-nowrap font-semibold`}> <AlignRight
                                    className={`w-4 h-4 ml-2`}/>توضیحات :</span>
                                <span className={`break-all pl-12.5`}>{data?.['description']}</span>
                                </div>
                            </span>
                </div>
            </div>
        </div>
    )
}
