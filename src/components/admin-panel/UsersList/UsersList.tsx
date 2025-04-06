'use client'
import type { ColumnDef } from '@tanstack/react-table'
import { useAdminPanelRoutes } from '@/app/api/admin-panel/routes'
import { SortableTable } from '@/components/tables/SortableTable'
import { Button } from '@/components/ui/button'
import LoadingIndicator from '@/components/ui/loading' //
import { toPersianDate, toPersianTime } from '@/utils/dateUtils'
import { useMutation } from '@tanstack/react-query'
import { ArrowUpDown } from 'lucide-react'
import React, { useEffect } from 'react'

export default function UsersList() {
  const { getUsersList } = useAdminPanelRoutes()
  const { data: UsersData, mutate: getUsersMutation, error, isPending, isSuccess } = useMutation({
    mutationFn: () => getUsersList(),
  })
  interface CategoryRow {
    id: number
    icon_name: string
    name_fa: string
    description: string
    created_at: string
  }

  const columns: ColumnDef<CategoryRow>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return (
          <div className="text-right">
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              #
              <ArrowUpDown />
            </Button>
          </div>
        )
      },
      enableSorting: true,
    },
    {
      accessorKey: 'mobile',
      header: ({ column }) => {
        return (
          <div className="text-right">
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              شماره تماس
              <ArrowUpDown />
            </Button>
          </div>
        )
      },
      enableSorting: false,
    },
    {
      accessorKey: 'created_at',
      header: ({ column }) => {
        return (
          <div className="text-right">
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              تاریخ و ساعت عضویت
              <ArrowUpDown />
            </Button>
          </div>
        )
      },
      enableSorting: true,
      cell: ({ row }) => { return `${toPersianTime(row.original.created_at)} - ${toPersianDate(row.original.created_at)}` }, // Convert to Persian date and time
    },
  ]
  useEffect(() => {
    getUsersMutation()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="relative h-full rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] font-vazir"
    >
      {isPending
        && (
          <div className="flex items-center justify-center w-full h-[300px]">
            <LoadingIndicator />
          </div>
        )}
      {error && (
        <div>
          Error:
          {error.message}
        </div>
      )}
      {isSuccess
        && (
          <div className="mx-auto p-4 py-0 h-full sticky-top">
            <SortableTable
              data={UsersData?.data.users}
              columns={columns}
              inputPlaceHolder="جستجو در کاربران..."
              searchColumn="mobile"
            />
          </div>
        )}
    </div>
  )
}
