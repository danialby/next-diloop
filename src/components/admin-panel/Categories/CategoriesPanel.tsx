'use client'

import NewCategoryDialog from '@/components/admin-panel/Categories/NewCategory/NewCategoryDialog'
import CategoryCard from '@/components/admin-panel/CategoryCard'
import { MainCategoryMenuBar } from '@/components/admin-panel/MainCategoryMenuBar'
import SearchInput from '@/components/common/SearchInput'
import useAdminStore from '@/store/adminStore'
import { useRouter } from 'next/navigation'
import React, { useMemo } from 'react'
import { useDebounceValue } from 'usehooks-ts'

export default function CategoriesPanel() {

  const router = useRouter()
  const {
    selectedMainCategory,
    categories_data,
  } = useAdminStore()

  const parents = useMemo(() => {
    // @ts-expect-error tags can be null
    return categories_data.filter(item => item?.parent_id === null && item?.tags?.includes(selectedMainCategory?.title))
  }, [categories_data, selectedMainCategory])

  const [searchQuery, setSearchQuery] = useDebounceValue('', 100)

  const filteredParents = useMemo(() => {
    return parents.filter(item => item?.name_fa.includes(searchQuery))
  }, [searchQuery, parents])

  function handleParentSelect(value) {
    router.push(`/admin-panel/categories/${value?.id}/`)
  }
  return (
    <div className="font-vazir">
      <div className={`flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0 md:justify-between md:bg-white md:shadow py-0.5 px-1 rounded-full md:shadow-md w-full `}>
        <div className="w-[320px] dir-ltr space-y-4">
          <MainCategoryMenuBar />
        </div>
        <NewCategoryDialog />
      </div>
      <SearchInput
        placeholder="جستجو..."
        onSearch={value =>
          setSearchQuery(value)}
        inputClasses="!shadow-none  rounded-full"
        className="mt-4 shadow shadow-md  max-w-[200px] rounded-full overflow-hidden"
      />
      <div
        className="my-2 grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 grid-rows-1 grid-flow-row font-vazir text-sm gap-1 ring-blue-200"
      >
          {
          filteredParents?.map(item => (
              <div key={item?.id}>
                <CategoryCard item={item} onSelect={handleParentSelect} />
              </div>
            )
          )
        }
      </div>
    </div>
  )
}
