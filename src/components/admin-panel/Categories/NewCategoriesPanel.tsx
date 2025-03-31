"use client";
import React, {useEffect, useMemo, useState} from "react";
import {useAdminPanelRoutes} from "@/app/api/admin-panel/routes";
import {useMutation} from "@tanstack/react-query";
import useAdminStore from "@/store/adminStore";
import NewCategoryDialog from "@/components/admin-panel/Categories/NewCategory/NewCategoryDialog";
import {MainCategoryMenuBar} from "@/components/admin-panel/MainCategoryMenuBar";
import {CollapseButton} from "@/components/common/CollapseButton";
import {useDebounceValue} from "usehooks-ts";
import SearchInput from "@/components/common/SearchInput";
import NewCategoryForm from "@/components/admin-panel/Categories/NewCategoryForm";
import LoadingIndicator from "@/components/ui/loading";
import {IconRenderer} from "@/components/ui/icon-picker";
import CategoryCard from "@/components/admin-panel/CategoryCard";
import {useRouter} from "next/navigation";

export default function NewCategoriesPanel() {
    const {getCategoriesList} = useAdminPanelRoutes();

    const router = useRouter()
    const {
        selectedMainCategory,
        categories_data,
        setCategoriesData,
        selectedJoblessParent,
        setSelectedJoblessParent,
        selectedEmployeeParent,
        setSelectedEmployeeParent
    } = useAdminStore()

    const {mutate: getCategoriesMutation, error, isPending} = useMutation({
        mutationFn: () => getCategoriesList(),
        onSuccess: ((response) => {
            setCategoriesData(response?.['data']?.categories)
        })
    });

    useEffect(() => {
        getCategoriesMutation();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const selectedJoblessParentList = useMemo(() => {
        return categories_data.filter(item => item?.['parent_id'] === selectedJoblessParent?.id);
    }, [categories_data, selectedJoblessParent]);

    const selectedEmployeeParentList = useMemo(() => {
        return categories_data.filter(item => item?.['parent_id'] === selectedEmployeeParent?.id);
    }, [categories_data, selectedEmployeeParent]);


    const JoblessParents = useMemo(() => {
        return categories_data.filter(item => item?.['parent_id'] === null && item?.['tags']?.includes('بیکار'));
    }, [categories_data]);

    const EmployeeParents = useMemo(() => {
        return categories_data.filter(item => item?.['parent_id'] === null && item?.['tags']?.includes('شاغل'));
    }, [categories_data]);


    const [joblessSearchQuery, setJoblessSearchQuery] = useDebounceValue("", 100);
    const [employeeSearchQuery, setEmployeeSearchQuery] = useDebounceValue("", 100);

    const filteredJoblessParents = useMemo(() => {
        return JoblessParents.filter(item => item?.['name_fa'].includes(joblessSearchQuery));
    }, [joblessSearchQuery, JoblessParents]);

    const filteredEmployeeParents = useMemo(() => {
        return EmployeeParents.filter(item => item?.['name_fa'].includes(employeeSearchQuery));
    }, [employeeSearchQuery, EmployeeParents]);


    function handleJoblessParentSelect(value) {
        setSelectedJoblessParent(value)
        router.push(`/admin-panel/new-categories/${value?.['name_en']}/`)
    }
    function handleEmployeeParentSelect(value) {
        setSelectedEmployeeParent(value)
        router.push(`/admin-panel/new-categories/${value?.['name_en']}/`)
    }
    
    if (error) return <div>Error: {error.message}</div>;
    return (
        <div className={`font-vazir`}>
            <div className={`flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0 md:justify-between md:bg-white md:shadow py-0.5 px-1 rounded-full md:shadow-md w-full `}>
                <div className={`w-[320px] dir-ltr space-y-4`}>
                    <MainCategoryMenuBar/>
                </div>
                    <NewCategoryDialog />
            </div>
            {selectedMainCategory.id === 1 &&
                <SearchInput
                    placeholder={'جستجو...'}
                    onSearch={(value) =>
                        setJoblessSearchQuery(value)
                    }
                    inputClasses={`!shadow-none  rounded-full`}
                    className={`mt-4 shadow shadow-md  max-w-[200px] rounded-full overflow-hidden`}
                />
            }
            {selectedMainCategory.id === 2 &&
                <SearchInput
                    placeholder={'جستجو...'}
                    onSearch={(value) =>
                        setEmployeeSearchQuery(value)
                    }
                    inputClasses={`!shadow-none  rounded-full`}
                    className={`mt-4 shadow shadow-md  max-w-[200px] rounded-full overflow-hidden`}
                />
            }
            <div
                className={`my-2 grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 grid-rows-1 grid-flow-row font-vazir text-sm gap-1 ring-blue-200`}>
                {
                    selectedMainCategory.id === 1 &&
                    (
                        isPending
                            ?
                            <div className={`flex items-center justify-center w-full h-[300px]`}>
                                <LoadingIndicator/>
                            </div>
                            :
                            filteredJoblessParents?.map((item, index) =>
                                <div key={item?.['id']}>
                                    <CategoryCard item={item} index={index} onSelect={handleJoblessParentSelect}/>
                                </div>
                            )
                    )
                }
                {
                    selectedMainCategory.id === 2 &&
                    (
                        isPending
                            ?
                            <div className={`flex items-center justify-center w-full h-[300px]`}>
                                <LoadingIndicator/>
                            </div>
                            :
                            filteredEmployeeParents?.map((item, index) =>
                                <div key={item?.['id']}>
                                    <CategoryCard item={item} index={index} onSelect={handleEmployeeParentSelect}/>
                                </div>
                            )
                    )
                }
            </div>
        </div>
    )
}

