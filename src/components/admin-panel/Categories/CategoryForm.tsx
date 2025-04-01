'use client'
import SubCategoryCard from '@/components/admin-panel/SubCategoryCard'
import LoadingIndicator from '@/components/ui/loading'
import useAdminStore from '@/store/adminStore'
import React, { useMemo } from 'react'

export interface CategoryRow {
  id: number
  icon_name: string
  name_fa: string
  description: string
  created_at: string
}

export default function CategoryForm({ data, isLoading }) {
  const {
    selectedMainCategory,
  } = useAdminStore()
  const DataBasedOnTag = useMemo(() => {
    return data?.filter(item => item?.tags?.includes(selectedMainCategory?.title))
  }, [data, selectedMainCategory])

  return (
    <div
      className="my-2 grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-6 grid-rows-1 grid-flow-row font-vazir text-sm gap-1 ring-blue-200"
    >
      {isLoading
        ? (
            <div className="flex items-center justify-center w-full h-[300px]">
              <LoadingIndicator />
            </div>
          )
        : DataBasedOnTag.length > 0
          ? DataBasedOnTag?.map(item => (
            <div key={item?.id}>
              <SubCategoryCard item={item} onSelect={undefined} />
            </div>
          ),
          )
        // <SortableTable data={DataBasedOnTag} columns={columns}
        //             inputPlaceHolder={'جستجو...'}
        //             searchColumn={'name_fa'}/> )
          : (
              <div className="flex w-full min-h-[100px] items-center justify-center">
                <span className="text-sm text-gray-400">
                  این دسته بندی هیج فصلی ندارد...
                </span>
              </div>
            )}
    </div>
  )
}
