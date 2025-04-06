'use client'

import AdminPanelSidebar from '@/components/admin-panel/AdminPanelSideBar'
import { useSidebar } from '@/context/SidebarContext'
import AppHeader from '@/layout/AppHeader'
import React, {useEffect} from 'react'
import {useAdminPanelRoutes} from "@/app/api/admin-panel/routes";
import useAdminStore from "@/store/adminStore";
import {useMutation} from "@tanstack/react-query";
import LoadingIndicator from "@/components/ui/loading";

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

    const { getCategoriesList } = useAdminPanelRoutes()
    const {
        selectedMainCategory,
        setCategoriesData,
    } = useAdminStore()

    const { mutate: getCategoriesMutation, error, isPending } = useMutation({
        mutationFn: () => getCategoriesList(),
        onSuccess: (response) => {
            // @ts-expect-error data in response
            setCategoriesData(response?.data?.categories)
        },
    })

    useEffect(() => {
        getCategoriesMutation()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (error) {
        return (
            <div>
                Error:
                {error.message}
            </div>
        )
    }

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

          {isPending ?
              <div className={'w-full h-[300px] flex items-center justify-center'}>
                  <LoadingIndicator />
              </div>
              :
              children}
        </div>
      </div>
    </div>
  )
}
