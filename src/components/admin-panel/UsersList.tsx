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
            cell: ({getValue}) => { return toPersianDate(getValue()) + '  ---------  ' + toPersianTime(getValue()) }, // Convert to Persian date and time
        },
    ];

    useEffect(() => {
        getUsersMutation();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    if (isPending) return <div>درحال دریافت اطلاعات...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (isSuccess)

        return <SortableTable data={UsersData?.['data'].users} columns={columns} /> ;
}

