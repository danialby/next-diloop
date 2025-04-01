'use client'

import AdminPanelSidebar from '@/components/admin-panel/AdminPanelSideBar'
import { useSidebar } from '@/context/SidebarContext'
import AppHeader from '@/layout/AppHeader'
import React from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isExpanded, isMobileOpen } = useSidebar()

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? 'mr-0'
    : isExpanded
      ? 'lg:mr-[290px]'
      : 'lg:mr-[70px]'

  // const { selectedMainCategory, selectedParent } = useAdminStore()

  // const breadCrumbItems = useMemo(() => {
  //   return [
  //     {
  //       title: selectedMainCategory.title,
  //       type: 'link',
  //     },
  //     {
  //       title: selectedParent?.name_fa,
  //       type: 'link',
  //     },
  //   ]
  // }, [selectedMainCategory, selectedParent])

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-slate-800">
      <AppHeader />
      {/* Sidebar and Backdrop */}
      <AdminPanelSidebar />
      {/* Main Content Area */}
      <div
        className={`transition-all block font-vazir  duration-300 ease-in-out relative ${mainContentMargin}`}
      >
        {/* Page Content */}
        <div className="p-4 mx-auto md:p-6 left-0">
          {/* <div className="space-y-2 mb-2 flex w-full justify-between items-center p-1 pr-4 pl-1"> */}
          {/*  <CustomBreadCrumb data={breadCrumbItems} separator={<ChevronLeft />} /> */}
          {/* </div> */}
          {children}
        </div>
      </div>
    </div>
  )
}
