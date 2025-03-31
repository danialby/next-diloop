"use client";
import React, {useMemo} from "react";
import {SortableTable} from "@/components/tables/SortableTable";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";
import {toPersianDate, toPersianTime} from "@/utils/dateUtils";
import ViewCategoryDialog from "@/components/admin-panel/Categories/ViewCategoryDialog";
import DeleteCategoryDialog from "@/components/admin-panel/Categories/DeleteCategory/DeleteCategoryDialog";
import LoadingIndicator from "@/components/ui/loading";
import Image from "next/image";
import UpdateSubCategoryDialog from "@/components/admin-panel/Categories/UpdateCategory/UpdateSubCategoryDialog";
import CategoryCard from "@/components/admin-panel/CategoryCard";
import SubCategoryCard from "@/components/admin-panel/SubCategoryCard";

export type CategoryRow = {
    id: number
    icon_name: string
    name_fa: string
    description: string
    created_at: string
}



const columns: ColumnDef<CategoryRow>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <div className="text-right"><Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    #
                    <ArrowUpDown/>
                </Button>
                </div>
            )
        },
        cell: ({ row }) => (
            <div className={'text-right pr-4'}>{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "poster_image",
        header: () => <div className="text-right">تصویر</div>,
        cell: ({ row }) => (
            <div className="text-right">
                { row.getValue("poster_image") ?
                    ( <Image src={row.getValue("poster_image")} width={100} height={56} className={`w-full h-14 rounded-lg`} alt={''} /> )
                    :
                    ( <span>تصویر ندارد</span> )
                }
            </div>
        ),
    },
    {
        accessorKey: "name_fa",
        header: ({ column }) => {
            return (
                <div className="text-right">
                    <Button
                        className={` !text-xs`}
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        عنوان
                        <ArrowUpDown className={`w-4 h-4`}/>
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("name_fa")}</div>,
    },
    {
        accessorKey: "description",
        header: () => <div className="text-right">توضیحات</div>,
        cell: ({ row }) => (
            <div>{row.getValue("description")}</div>
        ),
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <div className="text-right">
                    <Button
                        className={` !text-xs`}
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        تاریخ
                        <ArrowUpDown  className={`w-4 h-4`}/>
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => <>
            <div className={`flex flex-col`}>
                <span> {toPersianDate(row.getValue('created_at'))} </span>
                <span> {toPersianTime(row.getValue('created_at'))} </span>
            </div>
        </>
    },
    {
        id: "actions",
        header: () => <div className="text-right">عملیات</div>,
        cell: ({ row }) => {
            return (
                <div className={'flex gap-1 scale-[0.8]'}>
                    <ViewCategoryDialog category={row.original}/>
                    <UpdateSubCategoryDialog category={row.original} />
                    <DeleteCategoryDialog category={row.original} />
                </div>
            )
        },
    },
]

export default function NewCategoryForm2({data, isLoading, tag}) {

    const DataBasedOnTag = useMemo(() => {
        return data?.filter(item => item?.['tags']?.includes(tag));
    }, [data, tag]);

    return (
        <div
            className={`my-2 grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-6 grid-rows-1 grid-flow-row font-vazir text-sm gap-1 ring-blue-200`}>
            {isLoading ?
                <div className={`flex items-center justify-center w-full h-[300px]`}>
                    <LoadingIndicator />
                </div>
                :
                DataBasedOnTag.length > 0 ?
                    DataBasedOnTag?.map((item, index) =>
                        <div key={item?.['id']}>
                            <SubCategoryCard item={item} index={index} />
                        </div>
                    )
                    // <SortableTable data={DataBasedOnTag} columns={columns}
                    //             inputPlaceHolder={'جستجو...'}
                    //             searchColumn={'name_fa'}/> )
                    :
                    ( <div className={`flex w-full min-h-[100px] items-center justify-center`}>
                           <span className={`text-sm text-gray-400`}>
                               این دسته بندی هیج فصلی ندارد...
                           </span>
                        </div>
                    )
            }
        </div>
    )
}

