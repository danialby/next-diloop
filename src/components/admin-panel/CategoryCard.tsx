import {IconRenderer} from "@/components/ui/icon-picker";
import React, {useMemo} from "react";
import {NewDetailsCard} from "@/components/admin-panel/Categories/NewDetailsCard";
import AddSubCategoryDialog from "@/components/admin-panel/Categories/AddSubCategory/AddSubCategoryDialog";
import UpdateCategoryDialog from "@/components/admin-panel/Categories/UpdateCategory/UpdateCategoryDialog";
import DeleteCategoryDialog from "@/components/admin-panel/Categories/DeleteCategory/DeleteCategoryDialog";
import useAdminStore from "@/store/adminStore";
import {toPersianDate, toPersianTime} from "@/utils/dateUtils";


export default function CategoryCard({item, onSelect}) {
    const {categories_data, selectedJoblessParent, selectedEmployeeParent} = useAdminStore()
    const SubCategories = useMemo(() => {
        return categories_data.filter(category => category?.parent_id === item?.id && category?.tags?.length > 0)
    }, [categories_data]);

    return (
<div
     className="group relative cursor-pointer overflow-hidden  bg-white scale-[0.96] shadow shadow-sm  rounded-lg hover:shadow-md border hover:border-blue-500 hover:scale-[1] transition transition-[border, shadow, scale]"
>
                                        <div  onClick={() => onSelect(item)}
                                            className="relative z-20 h-full w-full flex md:flex-col md:justify-between gap-2 p-2 md:p-4 md:pb-1  transition transition-all duration-300 dark:bg-cyan-900 bg-white group-hover:opacity-0"
                                        >
                                            <span className="h-8 w-8 flex items-center justify-center border rounded-[10px] p-2">
                                            {
                                                item?.settings &&

                                                        <span className={`scale-[0.8]`}>
                                                            <IconRenderer name={item?.settings[0]?.['icon_name']}/>
                                                        </span>
                                                    }
                                            </span>
                                            <div className="flex flex-col gap-1">
                                                <span
                                                    className="truncate text-xs font-semibold lg:text-sm">
                                                    {item?.name_fa}
                                                </span>
                                                <span className="w-fit flex gap-1 opacity-50 text-xs">
                                                    <span className="font-bold">
                                                        { SubCategories.length }
                                                    </span>
                                                        <span className="font-medium">
                                                            زیرشاخه
                                                        </span>
                                                 </span>
                                                <span className={`flex justify-between mt-2 pt-1  text-xs text-gray-400 border-t-1`}>
                                                    <span>{toPersianTime(item?.created_at)}</span>
                                                    <span>{toPersianDate(item?.created_at)}</span>
                                                </span>
                                            </div>
                                         </div>
    <div
        className={`absolute left-0 top-0 z-10 h-full w-full flex md:flex-col gap-2 border p-2 md:p-4 md:pb-1  transition transition-all duration-300  overflow-hidden
                    !border-transparent dark:group-hover:bg-transparent group-hover:bg-blue-100`}
    >
                                          <span className="h-8 w-8 flex items-center justify-center border rounded-[10px] p-2 bg-blue-700 text-white">
                                        {
                                            item?.settings &&

                                                                <span className={`scale-[0.8]`}>
                                                                    <IconRenderer name={item?.settings[0]?.['icon_name']}/>
                                                                </span>
                                        }
                                          </span>
                                        <div className="flex flex-col gap-1">
                                           <span className="truncate text-xs font-semibold lg:text-sm">
                                               {item?.name_fa}
                                           </span>
                                           <span className="w-fit flex gap-1 text-f10 text-xs dark:text-blue-300 text-blue-800">
                                                <span className="font-bold">
                                                     { SubCategories.length }
                                                </span>
                                                <span className="font-medium">
                                                    زیرشاخه
                                                </span>
                                           </span>
                                            <span className={`flex justify-between mt-2 pt-1 text-xs text-gray-600 border-t-1 border-blue-600`}>
                                                    <span>{toPersianTime(item?.created_at)}</span>
                                                    <span>{toPersianDate(item?.created_at)}</span>
                                                </span>
                                        </div>
    </div>
    <div onClick={(e) => e.stopPropagation()} className={`absolute transition transition-all md:-top-1 left-1 opacity-0 scale-[0.7] gap-1 group-hover:!opacity-100 flex md:flex-col z-30`}>
        {/*<NewDetailsCard data={item} />*/}
        <AddSubCategoryDialog category={item}/>
        <UpdateCategoryDialog category={item}/>
        <DeleteCategoryDialog category={item}/>
    </div>
</div>
    )
}