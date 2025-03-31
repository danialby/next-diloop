"use client";

import type { Metadata } from "next";
import React, { useMemo, useCallback, useState } from "react";
import CategoryForm from "@/components/admin-panel/Categories/CategoryForm";
import useAdminStore from "@/store/adminStore";
import { DetailsCard } from "@/components/admin-panel/Categories/DetailsCard";
import NewCategoryForm2 from "@/components/admin-panel/Categories/NewCategoryForm2";
import { NewDetailsCard2 } from "@/components/admin-panel/Categories/NewDetailsCard2";
import { useDebounceValue } from "usehooks-ts";
import SearchInput from "@/components/common/SearchInput";
import {ArrowUpDown, ArrowUp, ArrowDown, SortAsc, SortDesc} from "lucide-react";

const SORT_ORDERS = {
    ASCENDING: 'asc',
    DESCENDING: 'desc',
    NONE: 'none'
} as const;

type SortConfig = {
    field: keyof typeof SORT_ORDERS | null;
    order: typeof SORT_ORDERS[keyof typeof SORT_ORDERS];
};

const CategoryPage: React.FC = () => {
    const {
        categories_data,
        selectedJoblessParent,
        selectedEmployeeParent,
        selectedMainCategory
    } = useAdminStore();

    const [joblessSortConfig, setJoblessSortConfig] = useState<SortConfig>({
        field: null,
        order: SORT_ORDERS.NONE
    });

    const [employeeSortConfig, setEmployeeSortConfig] = useState<SortConfig>({
        field: null,
        order: SORT_ORDERS.NONE
    });

    const selectedJoblessParentList = useMemo(() => {
        return categories_data.filter(item => item?.['parent_id'] === selectedJoblessParent?.id);
    }, [categories_data, selectedJoblessParent]);

    const selectedEmployeeParentList = useMemo(() => {
        return categories_data.filter(item => item?.['parent_id'] === selectedEmployeeParent?.id);
    }, [categories_data, selectedEmployeeParent]);


    const toggleSortOrder = useCallback((currentOrder: string) => {
        if (currentOrder === SORT_ORDERS.ASCENDING) return SORT_ORDERS.DESCENDING;
        if (currentOrder === SORT_ORDERS.DESCENDING) return SORT_ORDERS.NONE;
        return SORT_ORDERS.ASCENDING;
    }, []);

    const sortCategories = useCallback((
        categories: typeof selectedJoblessParentList,
        config: SortConfig
    ) => {
        if (config.field === null || config.order === SORT_ORDERS.NONE) {
            return categories;
        }

        return [...categories].sort((a, b) => {
            const aValue = a[config.field ?? 'created_at'];
            const bValue = b[config.field ?? 'created_at'];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                const comparison = aValue.localeCompare(bValue);
                return config.order === SORT_ORDERS.ASCENDING ? comparison : -comparison;
            }

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return config.order === SORT_ORDERS.ASCENDING
                    ? aValue - bValue
                    : bValue - aValue;
            }

            return 0;
        });
    }, []);

    const [joblessSearchQuery, setJoblessSearchQuery] = useDebounceValue("", 100);
    const [employeeSearchQuery, setEmployeeSearchQuery] = useDebounceValue("", 100);

    const filteredAndSortedJoblessSubCategories = useMemo(() => {
        let result = selectedJoblessParentList.filter(
            item => item?.['name_fa'].includes(joblessSearchQuery)
        );

        return sortCategories(result, joblessSortConfig);
    }, [joblessSearchQuery, selectedJoblessParentList, joblessSortConfig, sortCategories]);

    const filteredAndSortedEmployeeSubCategories = useMemo(() => {
        let result = selectedEmployeeParentList.filter(
            item => item?.['name_fa'].includes(employeeSearchQuery)
        );

        return sortCategories(result, employeeSortConfig);
    }, [employeeSearchQuery, selectedEmployeeParentList, employeeSortConfig, sortCategories]);

    const handleSortChange = useCallback((
        field: keyof typeof SORT_ORDERS | null,
        setter: (config: (prev) => {
            field: "ASCENDING" | "DESCENDING" | "NONE" | null;
            order: "desc" | "none" | "asc"
        }) => void
    ) => {
        setter(prev => ({
            field,
            order: toggleSortOrder(prev.order)
        }));
    }, [toggleSortOrder]);

    const getSortIcon = (field: string | null, order: string) => {
        if (field === null) {
            return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
        }

        if (field === 'created_at') {
            return order === SORT_ORDERS.ASCENDING
                ? <ArrowUp className="h-4 w-4 text-blue-300" />
                : order === SORT_ORDERS.DESCENDING
                    ? <ArrowDown className="h-4 w-4 text-blue-300" />
                    : <ArrowUpDown className="h-4 w-4 text-gray-400 group-hover:text-gray-100" />;
        }
        if (field === 'name_fa') {
            return order === SORT_ORDERS.ASCENDING
                ? <ArrowUp className="h-4 w-4 text-blue-300"/>
                : order === SORT_ORDERS.DESCENDING
                    ? <ArrowDown className="h-4 w-4 text-blue-300"/>
                    : <ArrowUpDown className="h-4 w-4 text-gray-400 group-hover:text-gray-100"/>;
        }
    };

    return (
        <>
            {selectedMainCategory?.id === 1 && (
                <>
                    <NewDetailsCard2 data={selectedJoblessParent} />
                    <span className={`mt-3 flex gap-1 text-sm`}>
            <span>زیرشاخه های</span>
            <span className={`font-bold`}>{selectedJoblessParent?.name_fa}</span>
          </span>
                    <div className="flex items-start justify-center gap-2 mt-4 flex-col">
                        <SearchInput
                            placeholder={'جستجو...'}
                            onSearch={(value) => setJoblessSearchQuery(value)}
                            inputClasses={`!shadow-none py-1 h-10 rounded-full`}
                            className={`shadow shadow-md max-w-[200px] rounded-full overflow-hidden`}
                        />
                        <div className={`flex gap-2 items-center text-xs`}>

                            <span className={`flex gap-1 items-center`}>
                                <SortDesc className={`w-4 h-4`} />
                                <span>مرتب سازی :</span>
                            </span>
                            <button
                                onClick={() => handleSortChange('created_at', setJoblessSortConfig)}
                                className={`group items-center flex gap-2 px-2 py-1 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-full 
                                           ${(joblessSortConfig.field === 'created_at' && joblessSortConfig.order !== 'none') && '!bg-blue-500 text-white'}`}
                            >
                                <span>تاریخ</span>
                                <span>{joblessSortConfig.field === 'created_at'
                                    ?
                                    getSortIcon(joblessSortConfig.field, joblessSortConfig.order)
                                    :
                                    <ArrowUpDown className="h-4 w-4 text-gray-400 group-hover:text-gray-100" />
                                }</span>
                            </button>
                            <button
                                onClick={() => handleSortChange('name_fa', setJoblessSortConfig)}
                                className={`group items-center flex gap-2 px-2 py-1 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-full 
                                            ${(joblessSortConfig.field === 'name_fa' && joblessSortConfig.order !== 'none') && '!bg-blue-500 text-white'}`}
                            >
                                <span>الفبا</span>
                                <span>{
                                    joblessSortConfig.field === 'name_fa'
                                        ?
                                        getSortIcon(joblessSortConfig.field, joblessSortConfig.order)
                                        :
                                        <ArrowUpDown className="h-4 w-4 text-gray-400 group-hover:text-gray-100" />
                                }</span>
                            </button>
                        </div>
                    </div>

                    <NewCategoryForm2
                        data={filteredAndSortedJoblessSubCategories}
                        tag={`بیکار`}
                    />
                </>
            )}

            {selectedMainCategory?.id === 2 && (
                <>
                    <NewDetailsCard2 data={selectedEmployeeParent} />
                    <span className={`mt-3 flex gap-1 text-sm`}>
            <span>زیرشاخه های</span>
            <span className={`font-bold`}>{selectedEmployeeParent?.name_fa}</span>
          </span>
                    <div className="flex items-start justify-center gap-2 mt-4 flex-col">
                        <SearchInput
                            placeholder={'جستجو...'}
                            onSearch={(value) => setJoblessSearchQuery(value)}
                            inputClasses={`!shadow-none py-1 h-10 rounded-full`}
                            className={`shadow shadow-md max-w-[200px] rounded-full overflow-hidden`}
                        />
                        <div className={`flex gap-2 items-center text-xs`}>

                            <span className={`flex gap-1 items-center`}>
                                <SortDesc className={`w-4 h-4`} />
                                <span>مرتب سازی :</span>
                            </span>
                            <button
                                onClick={() => handleSortChange('created_at', setEmployeeSortConfig)}
                                className={`group items-center flex gap-2 px-2 py-1 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-full 
                                            ${(employeeSortConfig.field === 'created_at' && employeeSortConfig.order !== 'none') && '!bg-blue-500 text-white'}`}
                            >
                            <span>تاریخ</span>
                            <span>{
                                employeeSortConfig.field === 'created_at'
                                ?
                                getSortIcon(employeeSortConfig.field, employeeSortConfig.order)
                                :
                                    <ArrowUpDown className="h-4 w-4 text-gray-400 group-hover:text-gray-100" />
                            }</span>
                        </button>
                            <button
                                onClick={() => handleSortChange('name_fa', setEmployeeSortConfig)}
                                className={`group items-center flex gap-2 px-2 py-1 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-full 
                                            ${(employeeSortConfig.field === 'name_fa' && employeeSortConfig.order !== 'none') && '!bg-blue-500 text-white'}`}
                            >
                            <span>الفبا</span>
                            <span>
                                {
                                employeeSortConfig.field === 'name_fa'
                                    ?
                                    getSortIcon(employeeSortConfig.field, employeeSortConfig.order)
                                    :
                                    <ArrowUpDown className="h-4 w-4 text-gray-400 group-hover:text-gray-100" />
                                 }</span>
                        </button>
                        </div>
                    </div>
                    <NewCategoryForm2
                        data={filteredAndSortedEmployeeSubCategories}
                        tag={`شاغل`}
                    />
                </>
            )}
        </>
    );
};

export default CategoryPage;