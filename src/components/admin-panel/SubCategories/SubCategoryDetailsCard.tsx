import InsertBookDialog from '@/components/admin-panel/Books/InsertBook/InsertBookDialog'
import DeleteCategoryDialog from '@/components/admin-panel/Categories/DeleteCategory/DeleteCategoryDialog'
import UpdateCategoryDialog from '@/components/admin-panel/Categories/UpdateCategory/UpdateCategoryDialog'
import { toPersianDate, toPersianTime } from '@/utils/dateUtils'
import { AlignRight, CalendarCheck2, SpellCheck, Type } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export function SubCategoryDetailsCard({ data }) {
  return (
    <div
      className="border grid grid-cols-2 rounded-lg bg-gray-50 dark:bg-secondary overflow-hidden relative shadow shadow-lg my-2 w-full min-h-32"
    >
      <div className="flex flex-col gap-2 p-4 text-xs relative">
        <div className="flex md:grid flex-col grid-cols-2 gap-y-1 md:gap-y-3">
          <span className="flex items-center">
            <div className="flex gap-2">
              <span className="flex text-nowrap font-semibold">
                {' '}
                <Type className="w-4 h-4 ml-2" />
                عنوان :
              </span>
              <span className={` text-nowrap`}>{data?.name_fa}</span>
            </div>
          </span>
          <span className="flex items-center">
            <div className="flex gap-2">
              <span className="flex text-nowrap font-semibold">
                {' '}
                <SpellCheck
                  className="w-4 h-4 ml-2"
                />
                نام انگلیسی :
              </span>
              <span className={` text-nowrap`}>{data?.name_en}</span>
            </div>
          </span>
          <span className="flex items-center">

            <div className="flex gap-2">
              <span className="flex text-nowrap font-semibold">
                {' '}
                <CalendarCheck2
                  className="w-4 h-4 ml-2"
                />
                {' '}
                تاریخ و ساعت :
              </span>
              <span className={` text-nowrap`}>
                {toPersianDate(data?.created_at)}
                {' '}
                -
                {' '}
                {toPersianTime(data?.created_at)}
              </span>
            </div>
          </span>
        </div>
        <hr className="dark:border-secondary-foreground" />
        <div className="flex flex-col md:flex-row col-span-1 gap-2 md:gap-4">
          <span className="flex items-center">
            <div className="flex gap-2 items-center">
              <span className="flex text-nowrap font-semibold">
                {' '}
                <AlignRight
                  className="w-4 h-4 ml-2"
                />
                توضیحات :
              </span>
              <span className="break-all pl-12.5">{data?.description}</span>
            </div>
          </span>
        </div>
        <div
          className="w-12.5 h-full absolute left-0 top-0 justify-center items-center py-2 md:py-3 px-4 flex flex-col gap-2 bg-gray-600"
        >
          <div className="flex flex-col scale-[0.85] gap-2">
            <InsertBookDialog subcategory={data} button_size="icon" />
            <UpdateCategoryDialog category={data} />
            <DeleteCategoryDialog category={data} />
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-start p-4">
        <span className="flex text-nowrap font-semibold text-xs">تصویر :</span>
        <span className={` text-nowrap`}>
          {data?.poster_image
            ? (
                <div className="p-2 rounded-lg bg-black text-white">
                  <Image src={data?.poster_image} alt="" width={100} height={100} />
                </div>
              )
            : ' بدون تصویر'}
        </span>
      </div>
    </div>
  )
}
