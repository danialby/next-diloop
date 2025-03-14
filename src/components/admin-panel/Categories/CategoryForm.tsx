"use client";
import React, {useMemo} from "react";
import {CategoryTable} from "@/components/admin-panel/Categories/CategoryTable";

export default function CategoryForm({data, isLoading, tag}) {

    const DataBasedOnTag = useMemo(() => {
        return data.filter(item => item?.['tags'].includes(tag));
    }, [data, tag]);

    return (
        <>
            {isLoading ?
                <div className={`flex items-center justify-center w-full h-[300px]`}>
                    <div aria-label="Loading"
                         className="relative inline-flex flex-col gap-2 items-center justify-center">
                        <div className="relative flex w-10 h-10">
                            <i
                                className="absolute w-full h-full rounded-full border-2 border-b-primary animate-spinner-ease-spin border-solid border-t-transparent border-l-transparent border-r-transparent">
                            </i>
                            <i
                                className="absolute w-full h-full rounded-full border-2 border-b-primary opacity-75 animate-spinner-linear-spin border-dotted border-t-transparent border-l-transparent border-r-transparent">
                            </i>
                        </div>
                    </div>
                </div>
                :
                <div className={`mx-4`}>
                    {DataBasedOnTag.length > 0 ?
                        (<CategoryTable data={DataBasedOnTag}/> )
                            :
                        ( <div className={`flex w-full min-h-[100px] items-center justify-center`}>
                           <span className={`text-sm text-gray-400`}>
                               این دسته بندی هیج فصلی ندارد...
                           </span>
                        </div>
                        )
                    }
                </div>
            }
        </>
    )
}

