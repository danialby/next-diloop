'use client'

import { CategoryDetailsCard } from '@/components/admin-panel/Categories/CategoryDetailsCard'
import CategoryForm from '@/components/admin-panel/Categories/CategoryForm'
import SearchInput from '@/components/common/SearchInput'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import useAdminStore from '@/store/adminStore'
import { ArrowDown, ArrowUp, ArrowUpDown, SortDesc } from 'lucide-react'
import React, { useCallback, useMemo, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

const SORT_ORDERS = {
  ASCENDING: 'asc',
  DESCENDING: 'desc',
  NONE: 'none',
} as const

const ITEMS_PER_PAGE = 10

interface SortConfig {
  field: 'created_at' | 'name_fa' | null
  order: typeof SORT_ORDERS[keyof typeof SORT_ORDERS]
}

const CategoryPage: React.FC = () => {
  const {
    categories_data,
    selectedParent,
  } = useAdminStore()

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: null,
    order: SORT_ORDERS.NONE,
  })
  const [currentPage, setCurrentPage] = useState(1)

  const subCategoriesList = useMemo(() => {
    return categories_data.filter((item) => {
      return item?.parent_id === selectedParent?.id
    })
  }, [categories_data, selectedParent])

  const toggleSortOrder = useCallback((currentOrder: string) => {
    if (currentOrder === SORT_ORDERS.ASCENDING)
      return SORT_ORDERS.DESCENDING
    if (currentOrder === SORT_ORDERS.DESCENDING)
      return SORT_ORDERS.NONE
    return SORT_ORDERS.ASCENDING
  }, [])

  const sortCategories = useCallback((
    categories: typeof subCategoriesList,
    config: SortConfig,
  ) => {
    if (config.field === null || config.order === SORT_ORDERS.NONE) {
      return categories
    }

    return [...categories].sort((a, b) => {
      const aValue = a[config.field ?? 'created_at']
      const bValue = b[config.field ?? 'created_at']

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue)
        return config.order === SORT_ORDERS.ASCENDING ? comparison : -comparison
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return config.order === SORT_ORDERS.ASCENDING
          ? aValue - bValue
          : bValue - aValue
      }

      return 0
    })
  }, [])

  const [searchQuery, setSearchQuery] = useDebounceValue('', 100)

  const filteredAndSortedSubCategories = useMemo(() => {
    const result = subCategoriesList.filter(
      item => item?.name_fa.includes(searchQuery),
    )
    return sortCategories(result, sortConfig)
  }, [searchQuery, subCategoriesList, sortConfig, sortCategories])

  // Pagination logic
  const totalItems = filteredAndSortedSubCategories.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return filteredAndSortedSubCategories.slice(startIndex, endIndex)
  }, [filteredAndSortedSubCategories, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const handleSortChange = useCallback((
    field: string,
    setter: (value: (((prevState: SortConfig) => SortConfig) | SortConfig)) => void,
  ) => {
    // @ts-expect-error SortConfig problem
    setter((prev: SortConfig) => ({
      field,
      order: toggleSortOrder(prev?.order),
    }))
    setCurrentPage(1)
  }, [toggleSortOrder])

  const getSortIcon = (field: string | null, order: string) => {
    if (field === null) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />
    }

    if (field === 'created_at') {
      return order === SORT_ORDERS.ASCENDING
        ? <ArrowUp className="h-4 w-4 text-blue-300" />
        : order === SORT_ORDERS.DESCENDING
          ? <ArrowDown className="h-4 w-4 text-blue-300" />
          : <ArrowUpDown className="h-4 w-4 text-gray-400 group-hover:text-gray-100" />
    }
    if (field === 'name_fa') {
      return order === SORT_ORDERS.ASCENDING
        ? <ArrowUp className="h-4 w-4 text-blue-300" />
        : order === SORT_ORDERS.DESCENDING
          ? <ArrowDown className="h-4 w-4 text-blue-300" />
          : <ArrowUpDown className="h-4 w-4 text-gray-400 group-hover:text-gray-100" />
    }
  }

  // Generate pagination range with ellipsis
  const getPaginationRange = () => {
    const visiblePages = 5
    const halfVisible = Math.floor(visiblePages / 2)
    let start = Math.max(1, currentPage - halfVisible)
    const end = Math.min(totalPages, start + visiblePages - 1)

    if (end - start + 1 < visiblePages) {
      start = Math.max(1, end - visiblePages + 1)
    }

    const pages: [unknown?] = []

    if (start > 1) {
      pages.push(1)
      if (start > 2) {
        pages.push('...')
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...')
      }
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <>
      <CategoryDetailsCard data={selectedParent} />
      <span className="mt-3 flex gap-1 text-sm">
        <span>زیرشاخه های</span>
        <span className="font-bold">{selectedParent?.name_fa}</span>
      </span>
      <div className={`flex items-start justify-center gap-2 mt-4 flex-col ${filteredAndSortedSubCategories?.length === 0 && searchQuery?.length === 0 && 'disabled'}`}>
        <SearchInput
          placeholder="جستجو..."
          onSearch={(value) => {
            setSearchQuery(value)
            setCurrentPage(1)
          }}
          inputClasses="!shadow-none py-1 h-10 rounded-full"
          className="shadow shadow-md max-w-[200px] rounded-full overflow-hidden"
        />
        <div className="flex gap-2 items-center text-xs">
          <span className="flex gap-1 items-center">
            <SortDesc className="w-4 h-4" />
            <span>مرتب سازی :</span>
          </span>
          <button
            type="button"
            onClick={() => handleSortChange('created_at', setSortConfig)}
            className={`group items-center flex gap-2 px-2 py-1 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-full 
                                           ${(sortConfig.field === 'created_at' && sortConfig.order !== 'none') && '!bg-blue-500 text-white'}`}
          >
            <span>تاریخ</span>
            <span>
              {sortConfig.field === 'created_at'
                ? getSortIcon(sortConfig.field, sortConfig.order)
                : <ArrowUpDown className="h-4 w-4 text-gray-400 group-hover:text-gray-100" />}
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleSortChange('name_fa', setSortConfig)}
            className={`group items-center flex gap-2 px-2 py-1 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-full 
                                            ${(sortConfig.field === 'name_fa' && sortConfig.order !== 'none') && '!bg-blue-500 text-white'}`}
          >
            <span>الفبا</span>
            <span>
              {
                sortConfig.field === 'name_fa'
                  ? getSortIcon(sortConfig.field, sortConfig.order)
                  : <ArrowUpDown className="h-4 w-4 text-gray-400 group-hover:text-gray-100" />
              }
            </span>
          </button>
        </div>
      </div>

      <CategoryForm
        data={paginatedCategories}
        isLoading={undefined}
      />

      {/* ShadCN Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`cursor-pointer ${currentPage === 1 && 'disabled'}`}
                />
              </PaginationItem>

              {getPaginationRange().map((page, index) => {
                if (page === '...') {
                  return (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }
                return (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => handlePageChange(page as number)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      <>
                        {page}
                      </>
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`cursor-pointer ${currentPage === totalPages && 'disabled'}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  )
}

export default CategoryPage
