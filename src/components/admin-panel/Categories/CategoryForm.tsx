"use client";
import React, {useMemo} from "react";
import {SortableTable} from "@/components/tables/SortableTable";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";
import {toPersianDate, toPersianTime} from "@/utils/dateUtils";
import ViewCategoryDialog from "@/components/admin-panel/Categories/ViewCategoryDialog";
import UpdateCategoryDialog from "@/components/admin-panel/Categories/UpdateCategoryDialog";
import DeleteCategoryDialog from "@/components/admin-panel/Categories/DeleteCategoryDialog";
import LoadingIndicator from "@/components/ui/loading";

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
            <div className={'text-center'}>{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "icon_name",
        header: () => <div className="text-right">آیکون</div>,
        cell: ({ row }) => (
            <div className="text-right">{row.getValue("icon_name") || 'ندارد'}</div>
        ),
    },
    {
        accessorKey: "name_fa",
        header: ({ column }) => {
            return (
                <div className="text-right"><Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    عنوان
                    <ArrowUpDown/>
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
                <div className="text-right"><Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    تاریخ
                    <ArrowUpDown/>
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
                <div className={'flex gap-1'}>
                    <ViewCategoryDialog category={row.original}/>
                    <UpdateCategoryDialog category={row.original} />
                    <DeleteCategoryDialog category={row.original} />
                </div>
            )
        },
    },
]

export default function CategoryForm({data, isLoading, tag}) {

    const DataBasedOnTag = useMemo(() => {
        return data.filter(item => item?.['tags'].includes(tag));
    }, [data, tag]);

    return (
        <>
            {isLoading ?
                <div className={`flex items-center justify-center w-full h-[300px]`}>
                    <LoadingIndicator />
                </div>
                :
                <div className={`mx-4`}>
                    {DataBasedOnTag.length > 0 ?
                        (<SortableTable data={DataBasedOnTag} columns={columns}
                                        inputPlaceHolder={'جستجو در دسته بندی ها...'}
                                        searchColumn={'name_fa'}/> )
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

