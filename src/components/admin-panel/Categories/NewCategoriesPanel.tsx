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

export default function NewCategoriesPanel() {
    const {getCategoriesList} = useAdminPanelRoutes();
    const {selectedMainCategory, categories_data, setCategoriesData} = useAdminStore()

    const {mutate: getCategoriesMutation, error, isPending} = useMutation({
        mutationFn: () => getCategoriesList(),
        onSuccess: ((response) => {
            setCategoriesData(response?.['data']?.categories)
        })
    });

    useEffect(() => {
        getCategoriesMutation();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const JoblessParents = useMemo(() => {
        return categories_data.filter(item => item?.['parent_id'] === null && item?.['tags']?.includes('بیکار'));
    }, [categories_data]);

    const EmployeeParents = useMemo(() => {
        return categories_data.filter(item => item?.['parent_id'] === null && item?.['tags']?.includes('شاغل'));
    }, [categories_data]);

    const [selectedJoblessParent, setSelectedJoblessParent] = useState<number>(1)
    const [selectedEmployeeParent, setSelectedEmployeeParent] = useState<number>(1)


    const selectedJoblessParentList = useMemo(() => {
        return categories_data.filter(item => item?.['parent_id'] === selectedJoblessParent);
    }, [categories_data, selectedJoblessParent]);

    const selectedEmployeeParentList = useMemo(() => {
        return categories_data.filter(item => item?.['parent_id'] === selectedEmployeeParent);
    }, [categories_data, selectedEmployeeParent]);





    const [joblessSearchQuery, setJoblessSearchQuery] = useDebounceValue("", 100);

    const filteredJoblessParents = useMemo(() => {
        console.log(joblessSearchQuery)
            return JoblessParents.filter(item => item?.['name_fa'].includes(joblessSearchQuery));

    }, [joblessSearchQuery, JoblessParents]);


    const [employeeSearchQuery, setEmployeeSearchQuery] = useDebounceValue("", 100);

    const filteredEmployeeParents = useMemo(() => {
            return EmployeeParents.filter(item => item?.['name_fa'].includes(employeeSearchQuery));

    }, [employeeSearchQuery, EmployeeParents]);


    if (error) return <div>Error: {error.message}</div>;
    return (
        <div className={`font-vazir`}>
            <div className={`flex items-center justify-center w-full `}>
                <div className={`w-[320px] dir-ltr space-y-4`}>
                    <MainCategoryMenuBar />
                </div>
            </div>
            <div className={`space-y-2 mt-4 flex w-full justify-center md:justify-start`}>
                <NewCategoryDialog />
                <hr/>
            </div>
            <div className={`my-2 md:grid md:grid-cols-3 xl:grid-cols-4 font-vazir text-sm gap-x-2`}>
                {selectedMainCategory.id === 1 &&
                    (
                        <div
                            className={`col-span-1 rounded-md overflow-x-hidden overflow-y-scroll no-scrollbar  shadow-[inset_0_0_5px_rgba(0,0,0,0.1)]`}>
                            <SearchInput
                                placeholder={'جستجو...'}
                                onSearch={(value) =>
                                    setJoblessSearchQuery(value)
                                }
                                inputClasses={`rounded-none w-full border-none !bg-transparent  !shadow-none !border-b-1 !border-blue-500`}
                                className={`rounded-t-md !bg-blue-100`}
                            />
                            {isPending ?
                                <div className={`flex items-center justify-center w-full h-[300px]`}>
                                    <LoadingIndicator/>
                                </div>
                                :
                                filteredJoblessParents?.map(item =>
                                    <div key={item?.['id']}>
                                        <CollapseButton data={item} selectedParent={selectedJoblessParent}
                                                        setSelected={setSelectedJoblessParent}/>
                                    </div>
                                )}
                        </div>
                    )}

                {selectedMainCategory.id === 2 &&
                    (
                        <div
                            className={`col-span-1 rounded-md overflow-x-hidden overflow-y-scroll no-scrollbar  shadow-[inset_0_0_5px_rgba(0,0,0,0.1)]`}>
                            <SearchInput
                                placeholder={'جستجو...'}
                                onSearch={(value) =>
                                    setEmployeeSearchQuery(value)
                                }
                                inputClasses={`rounded-none w-full border-none !bg-transparent  !shadow-none !border-b-1 !border-blue-500`}
                                className={`rounded-t-md !bg-blue-100`}
                            />
                            {isPending ?
                                <div className={`flex items-center justify-center w-full h-[300px]`}>
                                    <LoadingIndicator/>
                                </div>
                                :
                                filteredEmployeeParents?.map(item =>
                                    <div key={item?.['id']}>
                                        <CollapseButton data={item} selectedParent={selectedEmployeeParent}
                                                        setSelected={setSelectedEmployeeParent}/>
                                    </div>
                                )}
                        </div>
                    )}

                <div
                    className="relative h-full md:col-span-2 xl:col-span-3 rounded-lg border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] font-vazir  shadow shadow-lg">
                    {selectedMainCategory?.id === 1
                        ?
                        (<NewCategoryForm data={selectedJoblessParentList} tag={`بیکار`} isLoading={isPending}/>)
                        :
                        (<NewCategoryForm data={selectedEmployeeParentList} tag={`شاغل`} isLoading={isPending}/>)
                    }
                </div>


            </div>
        </div>
    )
}

