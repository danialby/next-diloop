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

    const {selectedMainCategory, categories_data, selectedJoblessParent, selectedEmployeeParent} = useAdminStore()

    const breadCrumbItems = useMemo(() => {
        return [
            {
                title: selectedMainCategory.title,
                type: 'link'
            },
            {
                title : selectedMainCategory?.id === 1 ? selectedJoblessParent?.name_fa : selectedEmployeeParent?.name_fa,
                type: 'link'
            }
        ]
    }, [selectedMainCategory,selectedJoblessParent,selectedEmployeeParent]);

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
            <div className={`space-y-2 mb-2 flex w-full justify-between items-center p-1 pr-4 pl-1`}>
                <CustomBreadCrumb data={breadCrumbItems} separator={<ChevronLeft />} />
            </div>
            {children}
        </div>
      </div>
    </div>
  );
}
