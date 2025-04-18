'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { XCircle } from 'lucide-react'

interface PageCardProps {
  page: {
    id: string
    title: string
    items: Array<{
      type: string
      text?: string
      question?: string
      content?: string
    }>
  }
  index: number
  isActive?: boolean
  className?: string
  onNavigate: (index: number) => void
  onDelete: (index: number) => void
}

export function PageCard({
  page,
  index,
  isActive = false,
  className,
  onNavigate,
  onDelete,
}: PageCardProps) {
  const getPreviewText = () => {
    if (page.title)
      return page.title

    const firstItem = page.items[0]
    if (!firstItem)
      return 'صفحه خالی'

    switch (firstItem.type) {
      case 'heading': return firstItem.text || 'عنوان'
      case 'text': return firstItem.content?.substring(0, 20) + (firstItem.content?.length > 20 ? '...' : '') || 'متن'
      case 'question': return firstItem.question || 'سوال'
      case 'rating': return 'امتیازدهی'
      case 'image': return 'تصویر'
      case 'video': return 'ویدیو'
      case 'button': return 'دکمه'
      case 'yesNoButtons': return 'بله/خیر'
      default: return 'محتوای ناشناخته'
    }
  }

  return (
    <div
      className={cn(
        'relative group p-2 rounded-lg border cursor-pointer transition-all h-16 flex items-center  overflow-hidden',
        isActive ? 'border-yellow-500 bg-yellow-50 shadow-md  !scale-[1.1]' : 'border-gray-200 hover:border-gray-300',
        className,
      )}
      onClick={() => onNavigate(index)}
    >
      <div className="flex-1 overflow-hidden">
        <div className="flex items-start gap-4 w-full flex-col">
          <span className="text-xs font-medium text-gray-500 w-5 flex-shrink-0">
            {index + 1}
          </span>
          <span className="text-xs text-gray-600 truncate">
            {getPreviewText()}
          </span>
        </div>
      </div>

      <Button
        className={cn(
          'absolute -left-7 top-3 -translate-y-1/2 text-rose-400 z-10 transition-all opacity-0',
          'hover:text-rose-600 group-hover:opacity-100',
          isActive && 'opacity-100 -left-2',
        )}
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(index)
        }}
      >
        <XCircle className="w-4 h-4" />
      </Button>
    </div>
  )
}
