"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import React, {useMemo, useState} from "react";
import AdminPanelSidebar from "@/components/admin-panel/AdminPanelSideBar";
import {MainCategoryMenuBar} from "@/components/admin-panel/MainCategoryMenuBar";
import CustomBreadCrumb from "@/components/custom/CustomBreadCrumb";
import {ChevronLeft} from "lucide-react";
import NewCategoryDialog from "@/components/admin-panel/Categories/NewCategory/NewCategoryDialog";
import useAdminStore from "@/store/adminStore";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "mr-0"
    : isExpanded
    ? "lg:mr-[290px]"
    : "lg:mr-[70px]";

    const {selectedMainCategory, categories_data} = useAdminStore()
    const [selectedJoblessParent] = useState<number>(1)
    const [selectedEmployeeParent] = useState<number>(1)


    const selectedParentDataJobless = useMemo(() => {
        return categories_data.filter(item => item?.['id'] === selectedJoblessParent && item?.['tags']?.includes('بیکار'))[0];
    }, [categories_data, selectedJoblessParent])

    const selectedParentDataEmployee = useMemo(() => {
        return categories_data.filter(item => item?.['id'] === selectedEmployeeParent && item?.['tags']?.includes('شاغل'))[0];
    }, [categories_data, selectedEmployeeParent])

    const breadCrumbItems = useMemo(() => {
        return [
            {
                title: selectedMainCategory.title,
                type: 'link'
            },
            {
                title : selectedMainCategory?.id === 1 ? selectedParentDataJobless?.name_fa : selectedParentDataEmployee?.name_fa,
                type: 'link'
            }
        ]
    }, [selectedMainCategory, selectedParentDataJobless, selectedParentDataEmployee]);

  return (
    <div className="relative min-h-screen bg-gray-100">
      <AppHeader />
      {/* Sidebar and Backdrop */}
      <AdminPanelSidebar />
      {/* Main Content Area */}
      <div
        className={`transition-all block font-vazir  duration-300 ease-in-out relative ${mainContentMargin}`}
      >
        {/* Page Content */}
        <div className={`p-4 mx-auto md:p-6 left-0`}>
            <div className={`flex items-center justify-center w-full `}>
                <div className={`w-[320px] dir-ltr space-y-4`}>
                    <MainCategoryMenuBar/>
                </div>
            </div>
            <div className={`space-y-2 mt-4 flex w-full justify-between items-center bg-white rounded-full p-1 pr-4 shadow shadow-md`}>
                <CustomBreadCrumb data={breadCrumbItems} separator={<ChevronLeft />} />
                <NewCategoryDialog />
            </div>
            {children}
        </div>
      </div>
    </div>
  );
}
