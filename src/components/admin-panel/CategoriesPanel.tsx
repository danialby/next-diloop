"use client";
import React, {useEffect} from "react";
import {useAdminPanelRoutes} from "@/app/api/admin-panel/routes";
import {useMutation} from "@tanstack/react-query";
import CategoryTabs from "@/components/admin-panel/CategoryTabs";
import CategoryForm from "@/components/admin-panel/CategoryForm";
export default function CategoriesPanel() {
    const { getCategoriesList } = useAdminPanelRoutes();
    const {data: CategoriesData, mutate: getCategoriesMutation, error, isPending, isSuccess} = useMutation({
        mutationFn: () => getCategoriesList()
    });

    const _CategoryTabs = [
        { label: 'دسته بندی منوی شاغل' },
        { label: 'دسته بندی منوی بیکار'},
    ];

    useEffect(() => {
        getCategoriesMutation();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (error) return <div>Error: {error.message}</div>;
    if (isSuccess)
        console.log(CategoriesData)
        return (
            <div className="relative h-full rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] font-vazir">
                <CategoryTabs tabs={_CategoryTabs}>
                    <CategoryForm data={CategoriesData} isLoading={isPending} />
                    <CategoryForm data={CategoriesData} isLoading={isPending} />
                </CategoryTabs>
            </div>
        )
}

