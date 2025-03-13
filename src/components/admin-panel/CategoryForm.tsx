"use client";
import React from "react";
import SortableTable from "@/components/tables/SortableTable";
import {toPersianDate, toPersianTime} from "@/utils/dateUtils";
import {CategoryTable} from "@/components/admin-panel/CategoryTable";

export default function CategoryForm({data, isLoading}) {
// Define the columns
    const columns = [
        {
            accessorKey: "id",
            header: "#",
            enableSorting: true,
        },
        {
            accessorKey: "icon",
            header: "آیکون",
            enableSorting: false,
            cell:'ندارد'
        },
        {
            accessorKey: "name_fa",
            header: "عنوان",
            enableSorting: true,
        },
        {
            accessorKey: "descriptions",
            header: "توضیحات",
            enableSorting: false,
        },
        {
            accessorKey: "created_at",
            header: "تاریخ",
            enableSorting: true,
            cell: ({getValue}) => <>
                <div className={`flex flex-col`}>
                <span> {toPersianDate(getValue())} </span>
                <span> {toPersianTime(getValue())} </span>
                </div>
            </>, // Convert to Persian date and time
        },
    ];


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
                <>
                    { data && <CategoryTable data={data} /> }
                     {/*<SortableTable data={data?.data?.categories} columns={columns} actions={true} />*/}
                </>
            }
        </>
    )
}

