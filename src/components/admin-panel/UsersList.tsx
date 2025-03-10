"use client";
import React, {useEffect} from "react";
import {getUsersList} from "@/app/api/admin-panel/routes";
import {useMutation} from "@tanstack/react-query";
import SortableTable from "@/components/tables/SortableTable";
import {toPersianDate, toPersianTime} from "@/utils/dateUtils"; //
export default function UsersList() {

    const getUsersMutation = useMutation({
        mutationFn: () => getUsersList()
    });

// Define the columns
    const columns = [
        {
            accessorKey: "id",
            header: "#",
            fixedWidth: 'w-4',
            customClass: 'text-center',
            enableSorting: true,
        },
        {
            accessorKey: "mobile",
            fixedWidth: 'w-40',
            header: "شماره تماس",
            enableSorting: false,
        },
        {
            accessorKey: "created_at",
            header: "تاریخ و ساعت عضویت",
            enableSorting: true,
            cell: (info: any) => { return toPersianDate(info.getValue()) + '  ---------  ' + toPersianTime(info.getValue()) }, // Convert to Persian date and time
        },
    ];

    useEffect(() => {
        getUsersMutation.mutate();
    }, []); // Empty dependency array runs once on mount


    if (getUsersMutation.isPending) return <div>درحال دریافت اطلاعات...</div>;
    if (getUsersMutation.error) return <div>Error: {getUsersMutation.error.message}</div>;
    if (getUsersMutation.isSuccess)

        return <SortableTable data={getUsersMutation.data} columns={columns} /> ;
}

