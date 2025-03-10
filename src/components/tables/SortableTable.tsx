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
    data: data.data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] font-vazir">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <table className="w-full">
              {/* Table Header */}
              <thead className="border-b border-gray-100 dark:border-white/[0.05]">
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
                              asc: <ChevronUpIcon />,
                              desc: <ChevronDownIcon />,
                            }[header.column.getIsSorted() as string] ?? null}
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
                            className={`px-5 py-4 sm:px-6 text-start text-gray-500 text-theme-sm dark:text-gray-400  border-l-1 border-gray-100 
                            ${
                                cell.column.id === "id" ? "w-4 text-center " : "" // Apply fixed-width class to the ID column
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
