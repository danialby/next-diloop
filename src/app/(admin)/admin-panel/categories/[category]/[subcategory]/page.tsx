'use client'

import { useAdminPanelRoutes } from '@/app/api/admin-panel/routes'
import BooksCard from '@/components/admin-panel/Books/BooksCard'

import { SubCategoryDetailsCard } from '@/components/admin-panel/SubCategories/SubCategoryDetailsCard'
import DataControlPanel from '@/components/common/DataControlPanel'
import LoadingIndicator from '@/components/ui/loading'
import useAdminStore from '@/store/adminStore'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useMemo } from 'react'
import {BookResponse} from "@/types";
import {useRouter} from "next/navigation";

const SubCategoryPage: React.FC = () => {
    const router = useRouter()
  const {
    books_data,
    setBooksData,
    selectedSubCategory,
  } = useAdminStore()

  const { getBooksList } = useAdminPanelRoutes()

  const { mutate: getBooksMutation, isPending } = useMutation({
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
    return books_data?.filter(book => book?.categories.filter(category => category?.id === selectedSubCategory?.id).length > 0)
  }, [books_data, selectedSubCategory])


    function handleBookSelect(value: BookResponse) {
      router.push(`/admin-panel/books/${value?.id}`)
    }
  return (
    <>
      <SubCategoryDetailsCard data={selectedSubCategory} />
      <span className="mt-3 flex gap-1 text-sm">
        <span>کتابچه های</span>
        <span className="font-bold">{selectedSubCategory?.name_fa}</span>
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
                isPending
                  ? (
                      <div className="flex items-center justify-center w-full h-[300px]">
                        <LoadingIndicator />
                      </div>
                    )
                  : (
                      <div className="my-2 grid sm:grid-cols-2 md:grid-cols-5 grid-rows-1 grid-flow-row font-vazir text-sm gap-1 ring-blue-200">
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
              }
            </>
          )
        }}
      </DataControlPanel>
    </>
  )
}

export default SubCategoryPage
