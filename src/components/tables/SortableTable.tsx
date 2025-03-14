import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import {ChevronDownIcon, ChevronUpIcon, PlusIcon} from "@/icons";
import Button from "@/components/ui/button/Button";
import ViewCategoryDialog from "@/components/admin-panel/Categories/ViewCategoryDialog";
import UpdateCategoryDialog from "@/components/admin-panel/Categories/UpdateCategoryDialog";
import DeleteCategoryDialog from "@/components/admin-panel/Categories/DeleteCategoryDialog";


export default function SortableTable({data, columns, actions = false}) {
  // State for sorting
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const parents = [
    { value: "1", text: "همه" },
    { value: "2", text: "کسب و کار بزرگ" },
    { value: "3", text: "متوسط" },
    { value: "4", text: "کوچک" },
    { value: "5", text: "خانگی" },
  ];
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
                                        <ChevronDownIcon className={`h-2.5`}/>
                                      </div>
                                      : '')
                              }
                            </div>
                          </th>
                    ))}
                    { actions &&
                    <th className={`px-5 py-3 bg-gray-200 select-none font-bold text-gray-500 text-start text-theme-lg dark:text-gray-400`}>
                      عملیات
                    </th>
                    }
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
                    { actions &&
                    <td className={`px-5 py-2 sm:px-6 text-start text-gray-500 text-theme-sm dark:text-gray-400  border-l-1 border-gray-100`}>
                      <div className={`flex gap-3 items-center`}>
                        <Button
                            className={`!rounded-full !p-4 !h-6 !w-6  !items-center !justify-center !flex !shadow-[0px_2px_4px_#aaa]`}>
                          <span><PlusIcon className={` !p-0 h-6 w-6 text-white`}/></span>
                        </Button>
                        <ViewCategoryDialog category={data[row.id]}/>
                        <UpdateCategoryDialog category={data[row.id]} _parents={parents} />
                        <DeleteCategoryDialog category={data[row.id]} />
                      </div>
                    </td>
                    }
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}
