'use client'

import type { BookResponse } from '@/types'
import { useAdminPanelRoutes } from '@/app/api/admin-panel/routes'

import BooksCard from '@/components/admin-panel/Books/BooksCard'
import { SubCategoryDetailsCard } from '@/components/admin-panel/SubCategories/SubCategoryDetailsCard'
import DataControlPanel from '@/components/common/DataControlPanel'
import useAdminStore from '@/store/adminStore'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'

const SubCategoryPage: React.FC = () => {
  const router = useRouter()
  const {
    books_data,
    setBooksData,
  } = useAdminStore()

  const params = useParams()
  const { subcategory: SubCategoryId = 0 } = params
  const {
    categories_data,
  } = useAdminStore()

  const page_data = useMemo(() => {
    return categories_data?.filter(item => item?.id === +SubCategoryId)[0]
  }, [SubCategoryId, categories_data])

  const { getBooksList } = useAdminPanelRoutes()

  const { mutate: getBooksMutation } = useMutation({
    mutationFn: () => getBooksList(),
    onSuccess: (response) => {
      // @ts-expect-error data in response
      setBooksData(response?.data?.books)
    },
  })

  useEffect(() => {
    getBooksMutation()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const booksOfSubCategory = useMemo(() => {
    return books_data?.filter(book => book?.categories.filter(category => category?.id === +SubCategoryId).length > 0)
  }, [books_data, SubCategoryId])

  function handleBookSelect(value: BookResponse) {
    router.push(`/admin-panel/books/${value?.id}`)
  }
  return (
    page_data
    && (
      <>
        <SubCategoryDetailsCard data={page_data} />
        <span className="mt-3 flex gap-1 text-sm">
          <span>کتابچه های</span>
          <span className="font-bold">{page_data?.name_fa}</span>
        </span>
        <DataControlPanel
          disablePagination={true}
          disableDateRange={true}
          data={booksOfSubCategory}
          searchFields={['title_fa']}
          sortableFields={[
            { field: 'created_at', title: 'تاریخ' },
            { field: 'title_fa', title: 'عنوان' },
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
                        <div className="my-2 grid !grid-cols-2 md:!grid-cols-5 xl:!grid-cols-10 grid-rows-1 grid-flow-row font-vazir text-sm gap-1 ring-blue-200">
                          {paginatedData.map(book => (
                            <div key={book?.id}>
                              <BooksCard
                                item={book}
                                onSelect={value => handleBookSelect(value)}
                              />
                            </div>
                          ))}
                        </div>
                      )
                    : (
                        <div className="flex w-full min-h-[100px] items-center justify-center">
                          <span className="text-sm text-gray-400">
                            کتابچه ای ثبت نشده است...
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

export default SubCategoryPage
