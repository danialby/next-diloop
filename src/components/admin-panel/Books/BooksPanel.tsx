// app/admin-panel/books/BooksPanel.tsx
'use client'

import { useAdminPanelRoutes } from '@/app/api/admin-panel/routes'
import BooksCard from '@/components/admin-panel/Books/BooksCard'
import InsertBookDialog from '@/components/admin-panel/Books/InsertBook/InsertBookDialog'
import { MainCategoryMenuBar } from '@/components/admin-panel/MainCategoryMenuBar'
import DataControlPanel from '@/components/common/DataControlPanel'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import LoadingIndicator from '@/components/ui/loading'
import useAdminStore from '@/store/adminStore'
import { useMutation } from '@tanstack/react-query'
import { ChevronLeft, Folder } from 'lucide-react'
import React, { useEffect, useMemo } from 'react'

export default function BooksPanel() {
  const { getBooksList, getCategoriesList } = useAdminPanelRoutes()
  const { selectedMainCategory, books_data, setBooksData, categories_data, setCategoriesData } = useAdminStore()

  const { mutate: getBooksMutation, error, isPending } = useMutation({
    mutationFn: () => getBooksList(),
    onSuccess: (response) => {
      // @ts-ignore
      setBooksData(response?.data?.books)
    },
  })

  const { mutate: getCategoriesMutation } = useMutation({
    mutationFn: () => getCategoriesList(),
    onSuccess: (response) => {
      // @ts-ignore
      setCategoriesData(response?.data?.categories)
    },
  })

  useEffect(() => {
    getBooksMutation()
    getCategoriesMutation()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Filter categories by selected main category
  const categoriesByMain = useMemo(() => {
    return categories_data?.filter(item =>
    // @ts-ignore
      item?.tags?.includes(selectedMainCategory?.title),
    ) || []
  }, [categories_data, selectedMainCategory])

  // Filter books by selected main category
  const books = useMemo(() => {
    return books_data?.filter(item =>
    // @ts-ignore
      item?.tags?.includes(selectedMainCategory?.title),
    ) || []
  }, [books_data, selectedMainCategory])

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    )
  }

  return (
    <div className="font-vazir">

      <Card
        className="grid grid-cols-2 gap-1 p-4 bg-cyan-900 text-white my-3 text-sm ring-yellow-600 ring-4 border-none"
      >
        <div className="p-2">تعداد کتاب ها :</div>
        <div className="p-2">تعداد صفحات :</div>
        <div className="p-2">تعداد کلمات :</div>
        <div className="p-2">تعداد کوییز ها :</div>
      </Card>
      <Card
        className="flex flex-col p-0 px-2"
      >
        <div className="flex justify-between w-full  items-center justify-center gap-3 md:gap-0 md:justify-between p-1 pt-3 w-full">
          <div className="w-[320px] dir-ltr space-y-4">
            <MainCategoryMenuBar />
          </div>
          <InsertBookDialog />
        </div>
        <DataControlPanel
          disablePagination={true}
          disableDateRange={true}
          data={books}
          searchFields={['title_fa']}
          sortableFields={[
            { field: 'created_at', title: 'تاریخ' },
            { field: 'title_fa', title: 'عنوان' },
          ]}
          itemsPerPage={10}
          searchPlaceholder="جستجو..."
        >
          {({ paginatedData }) => {
            // Get categories that have at least one book in the search results
            const visibleCategories = categoriesByMain.filter((category) => {
              return paginatedData.some(book =>
                book.categories?.some(bookCategory =>
                  bookCategory?.id === category.id,
                ),
              )
            })

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
                        visibleCategories.map((category) => {
                          // Filter books for this specific category from search results
                          const categoryBooks = paginatedData.filter(book =>
                            book.categories?.some(bookCategory =>
                              bookCategory?.id === category.id,
                            ),
                          )

                          return (
                            <div
                              className="flex flex-col border border-black/10 rounded-lg shadow overflow-hidden mx-3 mb-6"
                              key={category.id}
                            >
                              <div className="flex justify-between items-center px-2 py-1 gap-1.5 bg-cyan-500/30">
                                <div className="flex gap-1 items-center">
                                  <Folder size={14} className="text-cyan-800 w-5" />
                                  <div className="font-semibold text-sm text-cyan-800">{categories_data?.filter(_category => _category?.id === category?.parent_id)[0].name_fa}</div>
                                  <ChevronLeft size={14} className="text-cyan-800 w-5" />
                                  <div className="font-semibold text-sm text-cyan-800">{category?.name_fa}</div>
                                </div>
                                <Button variant="link" className="text-xs py-0 h-6 px-1 text-cyan-700 font-bold">
                                  نمایش همه
                                </Button>
                              </div>
                              <hr />
                              <div
                                className="p-2 px-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-10 grid-rows-1 grid-flow-row font-vazir text-sm gap-1 ring-cyan-200 bg-cyan-300/5"
                              >
                                {categoryBooks.map(book => (
                                  <div key={book?.id}>
                                    <BooksCard
                                      item={book}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        })
                      )
                }
              </>
            )
          }}
        </DataControlPanel>
      </Card>

    </div>
  )
}
