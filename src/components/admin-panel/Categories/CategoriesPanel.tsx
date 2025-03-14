"use client";
import React, {useEffect, useMemo, useState} from "react";
import {useAdminPanelRoutes} from "@/app/api/admin-panel/routes";
import {useMutation} from "@tanstack/react-query";
import CategoryTabs from "@/components/admin-panel/Categories/CategoryTabs";
import CategoryForm from "@/components/admin-panel/Categories/CategoryForm";
import useAdminStore from "@/store/adminStore";
import {Button} from "@/components/ui/button";
import NewCategoryDialog from "@/components/admin-panel/Categories/NewCategoryDialog";
import {AlignRight, Aperture, CalendarCheck2, SpellCheck, Type} from "lucide-react";
import {toPersianDate, toPersianTime} from "@/utils/dateUtils";
import DeleteCategoryDialog from "@/components/admin-panel/Categories/DeleteCategoryDialog";
import UpdateCategoryDialog from "@/components/admin-panel/Categories/UpdateCategoryDialog";
import AddSubCategoryDialog from "@/components/admin-panel/Categories/AddSubCategoryDialog";

export default function CategoriesPanel() {
    const {getCategoriesList} = useAdminPanelRoutes();
    const {categories_data, setCategoriesData} = useAdminStore()

    const {mutate: getCategoriesMutation, error, isPending, isSuccess} = useMutation({
        mutationFn: () => getCategoriesList(),
        onSuccess: ((response) => {
            setCategoriesData(response?.['data']?.categories)
        })
    });

    const _CategoryTabs = [
        {label: 'دسته بندی منوی شاغل'},
        {label: 'دسته بندی منوی بیکار'},
    ];

    useEffect(() => {
        getCategoriesMutation();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const parents = useMemo(() => {
        return categories_data.filter(item => item?.['parent_id'] === null);
    }, [categories_data]);

    const [selectedParent, setSelectedParent] = useState<number>(1)

    const selectedParentData = useMemo(() => {
        return categories_data.filter(item => item?.['id'] === selectedParent)[0];
    }, [categories_data, selectedParent]);

    const selectedParentList = useMemo(() => {
        return categories_data.filter(item => item?.['parent_id'] === selectedParent);
    }, [categories_data, selectedParent]);

    if (error) return <div>Error: {error.message}</div>;
            return (
                <div className={` font-vazir`}>
                    <div className={`space-y-2`}>
                    <NewCategoryDialog />
                    <hr />
                    </div>
                    <div className={`py-2 md:grid grid-cols-4 font-vazir text-sm gap-x-8`}>
                        <div className={`grid grid-cols-2 xl:grid-cols-3 md:gap-2 col-span-2 py-4`}>
                        {parents.map(item => {
                            return (
                                <div key={item?.['id']} >
                                <Button variant={selectedParent === item?.['id'] ? `default` : `ghost`} className={`rounded-full`}  onClick={() => setSelectedParent(item?.['id'])}>
                                    <div className="flex items-center space-x-2">
                                        {item?.['name_fa']}
                                    </div>
                                    {/*{selectedParent === item?.['id'] &&  <Badge variant={'secondary'}>{selectedParentData?.length}</Badge> }*/}
                                </Button>
                                </div>
                            )
                            })
                        }
                        </div>
                        <div className={`border rounded-lg col-span-2 bg-gray-50 overflow-hidden`}>
                            <div className={`w-full border-b-1 justify-center py-2 md:py-3 px-4 flex gap-2 bg-blue-100`}>
                                <AddSubCategoryDialog category={selectedParentData}/>
                                <UpdateCategoryDialog category={selectedParentData}/>
                                <DeleteCategoryDialog category={selectedParentData}/>
                            </div>
                            <div className={`flex flex-col gap-4 p-4`}>
                                <div className={`flex flex-col col-span-2 gap-y-1 md:gap-y-3`}>
                            <span className={`flex items-center`}>
                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-semibold`}> <Type className={`w-6 h-6 ml-2`}/>عنوان :</span>
                                <span className={` text-nowrap`}>{selectedParentData?.['name_fa']}</span>
                                </div>
                            </span>
                                    <span className={`flex items-center`}>
                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-semibold`}> <SpellCheck
                                    className={`w-6 h-6 ml-2`}/>نام انگلیسی :</span>
                                <span className={` text-nowrap`}>{selectedParentData?.['name_en']}</span>
                                </div>
                            </span>
                                    <span className={`flex items-center`}>

                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-semibold`}> <CalendarCheck2
                                    className={`w-6 h-6 ml-2`}/> تاریخ و ساعت :</span>
                                <span className={` text-nowrap`}>
                                    {toPersianDate(selectedParentData?.['created_at'])} - {toPersianTime(selectedParentData?.['created_at'])}
                                </span>
                                    </div>
                            </span>
                                    <span className={`flex items-center`}>
                                <div className={`flex gap-2`}>
                                <span className={`flex text-nowrap font-semibold`}> <AlignRight
                                    className={`w-6 h-6 ml-2`}/>توضیحات :</span>
                                <span className={` text-nowrap`}>{selectedParentData?.['description']}</span>
                                </div>
                            </span>
                                </div>
                                <hr />
                                <div className={`flex flex-col items-center col-span-1`}>
                                    <div className={`flex gap-2`}>
                                        <span className={`flex text-nowrap font-semibold`}> <Aperture
                                            className={`w-6 h-6 ml-2`}/>آیکون :</span>
                                        <span className={` text-nowrap`}>{selectedParentData?.['icon_name'] || 'آیکون ندارد'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="relative h-full rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] font-vazir">
                        <CategoryTabs tabs={_CategoryTabs}>
                            <CategoryForm data={selectedParentList} tag={`شاغل`} isLoading={isPending}/>
                            <CategoryForm data={selectedParentList} tag={`بیکار`} isLoading={isPending}/>
                        </CategoryTabs>
                    </div>
                </div>
            )
}

