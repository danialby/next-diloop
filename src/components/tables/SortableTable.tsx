import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import {ChevronDownIcon, ChevronUpIcon} from "@/icons";


export default function SortableTable({data, columns}) {
  // State for sorting
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Create the table instance
  const table = useReactTable({
    data: data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
      <div className="overflow-hidden rounded-xl border border-gray-200  dark:bg-white/[0.03] font-vazir">
        <div className="max-w-full overflow-x-auto">
          <div>
            <table className="w-full relative">
              {/* Table Header */}
              <thead className="border-b border-gray-100 dark:border-white/[0.05] sticky top-0 z-20 bg-white/[0.05]">
              {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <th
                            key={header.id}
                            className={`px-5 py-3 bg-gray-200 select-none font-bold text-gray-500 text-start text-theme-lg dark:text-gray-400
                            ${header.column.getCanSort() ? "cursor-pointer hover:text-blue-600" : ""}`}
                            onClick={header.column.getToggleSortingHandler()}
                        >
                          <div className="flex items-center gap-1">
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                            {{
                                  asc:
                                      <div className={`flex flex-col justify-center items-center`}>
                                        <ChevronUpIcon className={`h-2.5 text-white bg-blue-600 rounded-full`}/>
                                        <ChevronDownIcon className={`h-2.5`}/>
                                      </div>,
                                  desc:
                                      <div className={`flex flex-col justify-center items-center`}>
                                        <ChevronUpIcon className={`h-2.5`}/>
                                        <ChevronDownIcon className={`h-2.5 text-white bg-blue-600 rounded-full`}/>
                                       </div>,
                                }[header.column.getIsSorted() as string] ??
                                (header.column.getCanSort() ?
                                    <div className={`flex flex-col justify-center items-center`}>
                                      <ChevronUpIcon className={`h-2.5`}/>
                                      <ChevronDownIcon  className={`h-2.5`} />
                                </div>
                                : '')
                            }
                          </div>
                        </th>
                    ))}
                  </tr>
              ))}
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                        <td
                            key={cell.id}
                            className={`px-5 py-2 sm:px-6 text-start text-gray-500 text-theme-sm dark:text-gray-400  border-l-1 border-gray-100 
                            ${
                                cell.column.id === "id" ? "w-4 !text-center " : "" // Apply fixed-width class to the ID column
                            }`}
                        >
                          {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                          )}
                        </td>
                    ))}
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}
