"use client";
import React, {useState} from "react";
import Button from "@/components/ui/button/Button";
import {CheckLineIcon, EyeIcon, PencilIcon, PlusIcon, TrashBinIcon} from "@/icons";
import SortableTable from "@/components/tables/SortableTable";
import {toPersianDate, toPersianTime} from "@/utils/dateUtils";
import {Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import Form from "@/components/form/Form";
import Input from "@/components/form/input/InputField";
import CustomInput from "@/components/custom/CustomInput"; //

export default function CategoryForm({data, type, isLoading}) {
    const [isOpen, setIsOpen] = useState(false)
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
        {
            accessorKey: "actions",
            header: "عملیات",
            enableSorting: false,
            cell: <>
                <div className={`flex gap-3 items-center`}>
                    <Button className={`!rounded-full !p-4 !h-6 !w-6  !items-center !justify-center !flex !shadow-[0px_2px_4px_#aaa]`}>
                        <span><PlusIcon className={` !p-0 h-6 w-6 text-white`}/></span>
                    </Button>
                    <Button className={`!rounded-full !p-4 !h-6 !w-6 !items-center !justify-center !flex !bg-cyan-500 hover:!bg-cyan-600  !shadow-[0px_2px_4px_#aaa]`}>
                        <span><EyeIcon className={` !p-0 !p-0 h-6 w-6 text-white`}/></span>
                    </Button>
                    <Button className={`!rounded-full !p-4 !h-6 !w-6 !items-center !justify-center !flex !bg-green-500  hover:!bg-green-700  !shadow-[0px_2px_4px_#aaa]`}>
                        <span><PencilIcon className={` !p-0 !p-0 h-6 w-6 text-white`}/></span>
                    </Button>
                    <Button className={`!rounded-full !p-4 !h-6 !w-6 !items-center !justify-center !flex !bg-rose-400 hover:!bg-rose-500  !shadow-[0px_2px_4px_#aaa]`}>
                        <span><TrashBinIcon className={` !p-0 h-6 w-6 text-white`}/></span>
                    </Button>
                </div>
            </>,
        },
    ];


    return (
        <>
            {isLoading &&
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
                </div>}
            {data && <SortableTable data={data?.data?.categories} columns={columns}/>}
        </>
    )
}

