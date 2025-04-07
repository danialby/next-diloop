import type { BookResponse } from '@/types'
import DeleteBookDialog from '@/components/admin-panel/Books/DeleteBook/DeleteBookDialog'
import UpdateBookDialog from '@/components/admin-panel/Books/UpdateBook/UpdateBookDialog'
import { Button } from '@/components/ui/button'
import { toPersianDate, toPersianTime } from '@/utils/dateUtils'
import { BookOpenText, CalendarClock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface BooksCardProps {
  item: BookResponse
  onSelect?: (value: BookResponse) => void
}

export default function BooksCard({ item }: BooksCardProps) {
  const router = useRouter()
  function goBookPage(e) {
    e.stopPropagation()
    router.push(`/admin-panel/books/${item.id}`)
  }

  return (
    <div
      className="group relative cursor-pointer overflow-hidden aspect-[120/205]  bg-white scale-[0.96] shadow shadow-sm  rounded-lg hover:shadow-md hover:scale-[1] transition transition-[border, shadow, scale]"

    >
      <div
        onClick={goBookPage}
        className="relative z-20 bg-center bg-no-repeat bg- h-full w-full flex flex-col items-center justify-center gap-2 p-2 md:px-4 md:pt-2 md:pb-1 md:pl-4 min-h-24 transition transition-all duration-300 dark:bg-cyan-800 bg-white group-hover:opacity-0"
        style={{ backgroundImage: `url(${item?.poster_image})`, backgroundSize: `auto 100%` }}
      >
        <span
          className="absolute z-0 leading-[0px] h-0 p-0 m-0 w-full bottom-0 shadow-[0px_0px_70px_50px_rgba(255,255,255,1)] md:shadow-[0px_0px_70px_90px_rgba(255,255,255,1)]"
        >
        </span>
        <div className="flex flex-col gap-1 w-full h-full justify-end z-2">
          <span
            className="truncate text-xs font-semibold lg:text-sm"
          >
            {item?.title_fa}
          </span>
          <div className="flex gap-2">
            <span className="w-fit flex gap-1 text-f10 text-xs dark:text-cyan-300 text-cyan-800">
              <span className="font-bold">
                0
              </span>
              <span className="font-medium">
                صفحه
              </span>
            </span>
            <span className="w-fit flex gap-1 text-f10 text-xs dark:text-cyan-300 text-cyan-800">
              <span className="font-bold">
                0
              </span>
              <span className="font-medium">
                کوییز
              </span>
            </span>
          </div>
          <span className="flex mt-2 pt-1 gap-1 text-xs text-gray-400 border-t-1 border-gray-300">
            <span>{toPersianTime(item?.created_at)}</span>
            <CalendarClock size={14} className="text-black" />
            <span>{toPersianDate(item?.created_at)}</span>
          </span>
        </div>
      </div>
      <div
        className={`absolute left-0 top-0 z-10 h-full w-full flex flex-col gap-2 p-2 md:px-4 md:pt-2 md:pb-1  items-center justify-end   transition transition-all duration-300  overflow-hidden
                    bg-center bg-no-repeat dark:group-hover:bg-transparent group-hover:bg-cyan-50/50 md:group-hover:!pl-9 md:group-hover:!pr-2`}
        style={{ backgroundImage: `url(${item?.poster_image})`, backgroundSize: `auto 100%` }}
      >
        <span
          className="absolute z-0 leading-[0px] h-0 p-0 m-0 w-full bottom-0 shadow-[0px_0px_70px_50px_rgba(255,255,255,1)] md:shadow-[0px_0px_70px_90px_rgba(255,255,255,1)]"
        >
        </span>
        <div className="flex flex-col gap-1 w-full z-2">
          <span className="truncate text-xs font-semibold lg:text-sm">
            {item?.title_fa}
          </span>
          <div className="flex gap-2">
            <span className="w-fit flex gap-1 text-f10 text-xs dark:text-cyan-300 text-cyan-800">
              <span className="font-bold">
                0
              </span>
              <span className="font-medium">
                صفحه
              </span>
            </span>
            <span className="w-fit flex gap-1 text-f10 text-xs dark:text-cyan-300 text-cyan-800">
              <span className="font-bold">
                0
              </span>
              <span className="font-medium">
                کوییز
              </span>
            </span>
          </div>
          <span className="flex mt-2 pt-1 gap-1 text-xs text-gray-400 border-t-1 border-gray-300">
            <span>{toPersianTime(item?.created_at)}</span>
            <CalendarClock size={14} className="text-black" />
            <span>{toPersianDate(item?.created_at)}</span>
          </span>
        </div>
      </div>
      <div
        onClick={e => e.stopPropagation()}
        className="absolute transition transition-all md:-bottom-2.5 left-0 opacity-0 scale-[0.7] gap-1 group-hover:!opacity-100 flex md:flex-col z-30"
      >
        {/* <NewDetailsCard data={item} /> */}
        {/* <ViewCategoryDialog category={item} /> */}
        <Button
          onClick={goBookPage}
          size="icon"
          className="rounded-full"
        >
          <BookOpenText />
        </Button>
        {/* TODO change categories to courses */}
        <UpdateBookDialog book={item} />
        <DeleteBookDialog book={item} />
      </div>
    </div>
  )
}
