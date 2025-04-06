// components/common/DataControlPanel.tsx
'use client'

import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ArrowDown, ArrowUp, ArrowUpDown, CalendarIcon } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import SearchInput from './SearchInput'

type SortOrder = 'asc' | 'desc' | 'none'

interface SortConfig {
  field: string | null
  order: SortOrder
}

interface SortableFieldConfig {
  field: string
  title: string
}

interface DataControlPanelProps<T> {
  data: T[]
  children: (props: { paginatedData: T[] }) => ReactNode
  searchFields?: (keyof T)[]
  sortableFields?: SortableFieldConfig[]
  itemsPerPage?: number
  initialSort?: SortConfig
  searchPlaceholder?: string
  disablePagination?: boolean
  dateField?: string
  disableDateRange?: boolean // Add this flag
}

function DataControlPanel<T extends Record<string, any>>({
  data,
  children,
  searchFields = [],
  sortableFields = [],
  itemsPerPage = 10,
  initialSort = { field: null, order: 'none' },
  searchPlaceholder = 'Search...',
  disablePagination = false,
  dateField = 'created_at',
  disableDateRange = false, // Default to false
}: DataControlPanelProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig>(initialSort)
  const [searchQuery, setSearchQuery] = useDebounceValue('', 300)
  const [currentPage, setCurrentPage] = useState(1)
  const [dateRange, setDateRange] = useState<{ from?: Date, to?: Date }>({})

  // Filter and sort data
  const filteredData = useMemo(() => {
    let result = [...data]

    // Apply search filter
    if (searchQuery) {
      result = result.filter(item =>
        searchFields.some(field =>
          String(item[field]).toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      )
    }

    // Apply date range filter only if date range is enabled
    if (!disableDateRange && dateField && (dateRange.from || dateRange.to)) {
      result = result.filter((item) => {
        const itemDate = new Date(item[dateField])
        if (dateRange.from && dateRange.to) {
          return itemDate >= dateRange.from && itemDate <= dateRange.to
        }
        else if (dateRange.from) {
          return itemDate >= dateRange.from
        }
        else if (dateRange.to) {
          return itemDate <= dateRange.to
        }
        return true
      })
    }

    return result
  }, [data, searchQuery, searchFields, dateRange, dateField, disableDateRange])

  const sortedData = useMemo(() => {
    if (!sortConfig.field || sortConfig.order === 'none')
      return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.field!]
      const bValue = b[sortConfig.field!]

      if (aValue === bValue)
        return 0

      const comparison = aValue > bValue ? 1 : -1
      return sortConfig.order === 'asc' ? comparison : -comparison
    })
  }, [filteredData, sortConfig])

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedData.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedData, currentPage, itemsPerPage])

  const displayData = disablePagination ? sortedData : paginatedData

  // Handlers
  const handleSortChange = (field: string) => {
    setSortConfig(prev => ({
      field,
      order:
          prev.field !== field
            ? 'asc'
            : prev.order === 'asc'
              ? 'desc'
              : prev.order === 'desc' ? 'none' : 'asc',
    }))
    setCurrentPage(1)
  }

  const handleDateSortToggle = (value: 'newest' | 'oldest') => {
    setSortConfig({
      field: dateField,
      order: value === 'newest' ? 'desc' : 'asc',
    })
    setCurrentPage(1)
  }

  const getSortIcon = (field: string) => {
    if (sortConfig.field !== field)
      return <ArrowUpDown className="h-4 w-4" />
    return sortConfig.order === 'asc'
      ? <ArrowUp className="h-4 w-4" />
      : <ArrowDown className="h-4 w-4" />
  }

  return (
    <div className="w-full space-y-4">
      {/* Control Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Search */}
        <SearchInput
          placeholder={searchPlaceholder}
          onSearch={setSearchQuery}
          className="max-w-[300px]"
        />

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          {/* Date Range Picker - Conditionally render */}
          {!disableDateRange && (
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-[240px] justify-start text-left font-normal',
                      !dateRange.from && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from
                      ? (
                          dateRange.to
                            ? (
                                <>
                                  {format(dateRange.from, 'PPP')}
                                  {' '}
                                  -
                                  {format(dateRange.to, 'PPP')}
                                </>
                              )
                            : (
                                format(dateRange.from, 'PPP')
                              )
                        )
                      : (
                          <span>انتخاب تاریخ</span>
                        )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              {(dateRange.from || dateRange.to) && (
                <Button
                  variant="ghost"
                  onClick={() => setDateRange({})}
                  className="text-xs"
                >
                  پاک کردن
                </Button>
              )}
            </div>
          )}

          {/* Date Sort Toggle */}
          <ToggleGroup
            type="single"
            value={sortConfig.field === dateField
              ? (sortConfig.order === 'desc' ? 'newest' : 'oldest')
              : undefined}
            onValueChange={(value) => {
              if (value === 'newest' || value === 'oldest') {
                handleDateSortToggle(value)
              }
            }}
          >
            <ToggleGroupItem value="newest" aria-label="Newest first" variant="outline" size="sm" className="text-xs h-6 px-3 hover:!bg-rose-500 hover:!text-white aria-checked:!bg-rose-600 aria-checked:!text-white">
              جدیدترین
            </ToggleGroupItem>
            <ToggleGroupItem value="oldest" aria-label="Oldest first" variant="outline" size="sm" className="text-xs px-3  h-6 hover:!bg-rose-500 hover:!text-white aria-checked:!bg-rose-600 aria-checked:!text-white">
              قدیمی ترین
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Other Sorting */}
          {sortableFields.filter(f => f.field !== dateField).length > 0 && (
            <div className="flex gap-2 items-center">
              {sortableFields
                .filter(field => field.field !== dateField)
                .map(({ field, title }) => (
                  <Button
                    key={field}
                    variant="ghost"
                    onClick={() => handleSortChange(field)}
                    className="gap-2"
                  >
                    {title}
                    {getSortIcon(field)}
                  </Button>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Children with display data */}
      {children({ paginatedData: displayData })}

      {/* Pagination */}
      {!disablePagination && totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className={`${currentPage === 1 && 'disabled'}`}
              />
            </PaginationItem>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = Math.max(1, Math.min(
                currentPage - 2 + i,
                totalPages - 4,
              ))
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className={`${currentPage === totalPages && 'disabled'}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

export default DataControlPanel
