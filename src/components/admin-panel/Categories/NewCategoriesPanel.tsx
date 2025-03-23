"use client";
import React, {useEffect, useMemo, useState} from "react";
import {useAdminPanelRoutes} from "@/app/api/admin-panel/routes";
import {useMutation} from "@tanstack/react-query";
import CategoryForm from "@/components/admin-panel/Categories/CategoryForm";
import useAdminStore from "@/store/adminStore";
import {Button} from "@/components/ui/button";
import NewCategoryDialog from "@/components/admin-panel/Categories/NewCategory/NewCategoryDialog";
import { DetailsCard } from "@/components/admin-panel/Categories/DetailsCard";
import {MainCategoryMenuBar} from "@/components/admin-panel/MainCategoryMenuBar";
import {IconRenderer} from "@/components/ui/icon-picker";
import {AccordionList} from "@/components/common/AccordionList";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {CollapseButton} from "@/components/common/CollapseButton";
import SearchBar from "@/components/skills/SearchBar";

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

    const [selectedJoblessParent, setSelectedJoblessParent] = useState<number | null>(1)
    const [selectedEmployeeParent, setSelectedEmployeeParent] = useState<number | null>(1)

    const selectedParentDataJobless = useMemo(() => {
        return categories_data.filter(item => item?.['id'] === selectedJoblessParent && item?.['tags']?.includes('بیکار'))[0];
    }, [categories_data, selectedJoblessParent])

    const selectedParentDataEmployee = useMemo(() => {
        return categories_data.filter(item => item?.['id'] === selectedEmployeeParent && item?.['tags']?.includes('شاغل'))[0];
    }, [categories_data, selectedEmployeeParent])

    const selectedJoblessParentList = useMemo(() => {
        return categories_data.filter(item => item?.['parent_id'] === selectedJoblessParent);
    }, [categories_data, selectedJoblessParent]);

    const selectedEmployeeParentList = useMemo(() => {
        return categories_data.filter(item => item?.['parent_id'] === selectedEmployeeParent);
    }, [categories_data, selectedEmployeeParent]);

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
            <div className={`my-2 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 font-vazir text-sm gap-x-8`}>
                {selectedMainCategory.id === 1 &&
                    (<div className={`col-span-1 h-[60vh] rounded-md overflow-x-hidden overflow-y-scroll no-scrollbar  shadow-[inset_0_0_5px_rgba(0,0,0,0.1)]`}>
                            <SearchBar inputClasses={`rounded-none w-full border-none !bg-transparent !shadow-none !border-b-1 !border-blue-500`} className={`rounded-t-md`} />
                        { JoblessParents.map(item =>
                            <>
                                <CollapseButton data={item} selectedParent={selectedJoblessParent}
                                                setSelected={setSelectedJoblessParent} />
                            {/*<div key={item?.['id']}>*/}
                            {/*    <Button variant={selectedJoblessParent === item?.['id'] ? `default` : `ghost`}*/}
                            {/*            className={`rounded-full`}*/}
                            {/*            onClick={() => setSelectedJoblessParent(item?.['id'])}>*/}
                            {/*        <div className="flex items-center space-x-2">*/}
                            {/*            {item?.['name_fa']}*/}
                            {/*        </div>*/}
                            {/*        /!*{selectedParent === item?.['id'] &&  <Badge variant={'secondary'}>{selectedParentData?.length}</Badge> }*!/*/}
                            {/*    </Button>*/}
                            {/*</div>*/}
                            </>
                        )}
                    </div>
                    )}
                {selectedMainCategory.id === 2 &&
                    (<div className={`col-span-2 grid grid-cols-2 gap-x-2 items-start`}>
                        {EmployeeParents.map(item =>
                            <>
                                <CollapseButton data={item} selectedParent={selectedEmployeeParent}
                                                setSelected={setSelectedEmployeeParent}/>
                                {/*<div key={item?.['id']}>*/}
                                {/*    <Button variant={selectedJoblessParent === item?.['id'] ? `default` : `ghost`}*/}
                                {/*            className={`rounded-full`}*/}
                                {/*            onClick={() => setSelectedJoblessParent(item?.['id'])}>*/}
                                {/*        <div className="flex items-center space-x-2">*/}
                                {/*            {item?.['name_fa']}*/}
                                {/*        </div>*/}
                                {/*        /!*{selectedParent === item?.['id'] &&  <Badge variant={'secondary'}>{selectedParentData?.length}</Badge> }*!/*/}
                                {/*    </Button>*/}
                                {/*</div>*/}
                            </>
                        )}
                    </div>
                    )}
                {/*{(selectedMainCategory?.id === 1) &&*/}
                {/*        <div className={`col-span-1`}>*/}
                {/*            <DetailsCard data={selectedParentDataJobless}/>*/}
                {/*        </div>*/}
                {/*}*/}
                {/*{(selectedMainCategory?.id === 2) &&*/}
                {/*        <div className={`col-span-1`}>*/}
                {/*            <DetailsCard data={selectedParentDataEmployee}/>*/}
                {/*        </div>*/}
                {/*}*/}
            </div>
            {/*<div*/}
            {/*    className="relative h-full rounded-lg border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] font-vazir  shadow shadow-lg">*/}
            {/*    {selectedMainCategory?.id === 1*/}
            {/*        ?*/}
            {/*        (<CategoryForm data={selectedJoblessParentList} tag={`بیکار`} isLoading={isPending}/>)*/}
            {/*        :*/}
            {/*        (<CategoryForm data={selectedEmployeeParentList} tag={`شاغل`} isLoading={isPending}/>)*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    )
}

