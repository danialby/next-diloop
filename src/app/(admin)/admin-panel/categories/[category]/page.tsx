'use client'

import { CategoryDetailsCard } from '@/components/admin-panel/Categories/CategoryDetailsCard'
import SubCategoryCard from '@/components/admin-panel/SubCategoryCard'
import DataControlPanel from '@/components/common/DataControlPanel'
import useAdminStore from '@/store/adminStore'
import { useParams, useRouter } from 'next/navigation'
import React, { useMemo } from 'react'

const CategoryPage: React.FC = () => {
  const router = useRouter()
  const params = useParams()
  const { category: CategoryId = 0 } = params
  const {
    categories_data,
  } = useAdminStore()

  const page_data = useMemo(() => {
    console.log('here')
    return categories_data.filter(item => item?.id === +CategoryId)[0]
  }, [CategoryId, categories_data])

  const subCategoriesList = useMemo(() => {
    return categories_data.filter((item) => {
      return item?.parent_id === +CategoryId
    })
  }, [categories_data, CategoryId])

  function handleSelect(value) {
    router.push(`/admin-panel/categories/${CategoryId}/${value?.id}`)
  }

  return (

    page_data
    && (
      <>
        <CategoryDetailsCard data={page_data} />
        <span className="mt-3 flex gap-1 text-sm">
          <span>زیرشاخه های</span>
          <span className="font-bold">{page_data?.name_fa}</span>
        </span>

        <DataControlPanel
          disablePagination={false}
          disableDateRange={true}
          data={subCategoriesList}
          searchFields={['name_fa']}
          sortableFields={[
            { field: 'created_at', title: 'تاریخ' },
            { field: 'name_fa', title: 'عنوان' },
          ]}
          itemsPerPage={10}
          searchPlaceholder="جستجو..."
        >
          {({ paginatedData }) => {
            return (
              <>
                {
                  paginatedData?.length > 0
                    ? (
                        <div className="my-2 grid sm:grid-cols-2 md:grid-cols-5 grid-rows-1 grid-flow-row font-vazir text-sm gap-1 ring-blue-200">
                          {paginatedData.map(subCategory => (
                            <div key={subCategory?.id}>
                              <SubCategoryCard
                                item={subCategory}
                                onSelect={value => handleSelect(value)}
                              />
                            </div>
                          ))}
                        </div>
                      )
                    : (
                        <div className="flex w-full min-h-[100px] items-center justify-center">
                          <span className="text-sm text-gray-400">
                            زیر شاخه ای ثبت نشده است...
                          </span>
                        </div>
                      )
                }
              </>
            )
          }}
        </DataControlPanel>

      </>
    )
  )
}

export default CategoryPage
