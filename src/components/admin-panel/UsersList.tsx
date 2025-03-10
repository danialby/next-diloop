"use client";
import React, {useEffect} from "react";
import {useAdminPanelRoutes} from "@/app/api/admin-panel/routes";
import {useMutation} from "@tanstack/react-query";
import SortableTable from "@/components/tables/SortableTable";
import {toPersianDate, toPersianTime} from "@/utils/dateUtils"; //
export default function UsersList() {
    const { getUsersList } = useAdminPanelRoutes();
    const { data: UsersData, mutate: getUsersMutation, error, isPending, isSuccess } = useMutation({
        mutationFn: () => getUsersList()
    });

// Define the columns
    const columns = [
        {
            accessorKey: "id",
            header: "#",
            enableSorting: true,
        },
        {
            accessorKey: "mobile",
            header: "شماره تماس",
            enableSorting: false,
        },
        {
            accessorKey: "created_at",
            header: "تاریخ و ساعت عضویت",
            enableSorting: true,
            cell: ({getValue}) => { return `${toPersianTime(getValue())} - ${toPersianDate(getValue())}` }, // Convert to Persian date and time
        },
    ];

    useEffect(() => {
        getUsersMutation();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

        return (
            <div
                className="relative h-full rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] font-vazir">
                {isPending &&
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
                {error && <div>Error: {error.message}</div>}
                {isSuccess && <SortableTable data={UsersData?.['data'].users} columns={columns}/>}
            </div>
        )
}

