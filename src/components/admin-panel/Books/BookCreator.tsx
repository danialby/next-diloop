'use client'

import BookProgressBar from '@/components/admin-panel/Books/BookPages/BookProgressBar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { clsx } from 'clsx'
import { ChevronLeft, ChevronRight, Heart, Smile, Star } from 'lucide-react'
import * as React from 'react'

// Use the same types from BookPage
type PageItemType = 'heading' | 'text' | 'rating' | 'question' | 'image' | 'video' | 'button' | 'yesNoButtons'

interface BasePageItem {
  id: string
  type: PageItemType
}

interface HeadingItem extends BasePageItem {
  type: 'heading'
  text: string
  size: 'h1' | 'h2' | 'h3'
}

interface TextItem extends BasePageItem {
  type: 'text'
  content: string
}

interface RatingItem extends BasePageItem {
  type: 'rating'
  question: string
  iconShape: 'star' | 'heart' | 'smiley'
  maxRating: number
  rating: number | null
}

interface QuestionItem extends BasePageItem {
  type: 'question'
  question: string
  options: string[]
}

interface ImageItem extends BasePageItem {
  type: 'image'
  url: string | File
  caption?: string
}

interface VideoItem extends BasePageItem {
  type: 'video'
  url: string
}

interface ButtonItem extends BasePageItem {
  type: 'button'
  text: string
  action: string
}

interface YesNoButtonsItem extends BasePageItem {
  type: 'yesNoButtons'
  question: string
  yesText: string
  noText: string
}

type PageItem = HeadingItem | TextItem | RatingItem | QuestionItem | ImageItem | VideoItem | ButtonItem | YesNoButtonsItem

interface Page {
  id: string
  title: string
  items: PageItem[]
}

interface BookCreatorProps {
  pages: Page[]
  currentIndex: number
  onNext: () => void
  onPrev: () => void
  onClose: () => void
  onUpdate?: (page: Page) => void
  className?: string
  isEditing?: boolean
}

function BookCreator({ ref, pages, currentIndex, onNext, onPrev, onClose, onUpdate, className, isEditing = false }: BookCreatorProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const currentPage = pages[currentIndex]

  React.useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [currentIndex])

  const handleRatingChange = (rating: number) => {
    if (!onUpdate || currentPage.items.length === 0)
      return

    const ratingItem = currentPage.items.find(item => item.type === 'rating') as RatingItem | undefined
    if (!ratingItem)
      return

    const updatedItems = currentPage.items.map(item =>
      item.type === 'rating' ? { ...item, rating } : item,
    )

    onUpdate({
      ...currentPage,
      items: updatedItems,
    })
  }

  const renderRatingIcons = (item: RatingItem) => {
    const IconComponent
            = item.iconShape === 'heart'
              ? Heart
              : item.iconShape === 'smiley'
                ? Smile
                : Star

    return (
      <div className="flex gap-2">
        {Array.from({ length: item.maxRating }).map((_, i) => (
          <button
            key={i}
            onClick={() => !isEditing && handleRatingChange(i + 1)}
            className="focus:outline-none"
          >
            <IconComponent
              className={`w-10 h-10 ${
                item.rating && i < item.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  const renderItemContent = (item: PageItem) => {
    switch (item.type) {
      case 'heading':
        return (
          <h2 className={clsx(
            'font-bold text-gray-800 mb-4 break-all',
            item.size === 'h1'
              ? 'text-2xl'
              : item.size === 'h2'
                ? 'text-xl'
                : 'text-lg',
          )}
          >
            {item.text}
          </h2>
        )
      case 'text':
        return <p className="text-gray-700 break-all">{item.content}</p>
      case 'rating':
        return (
          <>
            <h3 className="text-xl font-bold text-gray-800 mb-4 break-all">
              {item.question}
            </h3>
            <div className="flex flex-col items-center gap-6 mt-8">
              {renderRatingIcons(item)}
              {!isEditing && (
                <button
                  onClick={onNext}
                  disabled={item.rating === null}
                  className={`px-6 py-3 rounded-lg transition-colors ${
                    item.rating === null
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  ارسال
                </button>
              )}
            </div>
          </>
        )
      case 'question':
        return (
          <>
            <h3 className="text-xl font-bold text-gray-800 mb-4 break-all">
              {item.question}
            </h3>
            <div className="space-y-2 mt-6">
              {item.options.map((option, idx) => (
                <div
                  key={idx}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={!isEditing ? onNext : undefined}
                >
                  {option}
                </div>
              ))}
            </div>
          </>
        )
      case 'image':
        return (
          <>
            <div className="mt-6">
              {typeof item.url === 'string'
                ? (
                    <img
                      src={item.url}
                      alt={item.caption || ''}
                      className="max-w-full h-auto rounded-lg"
                    />
                  )
                : (
                    <div className="bg-gray-200 p-8 rounded-lg text-center break-all">
                      <p>تصویر آپلود شده</p>
                    </div>
                  )}
            </div>
            {item.caption && (
              <p className="mt-4 text-sm text-gray-500 break-all">{item.caption}</p>
            )}
          </>
        )
      case 'video':
        return (
          <div className="mt-6">
            {item.url && (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={item.url}
                  className="w-full h-64 rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        )
      case 'button':
        return (
          <button
            onClick={!isEditing ? onNext : undefined}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {item.text}
          </button>
        )
      case 'yesNoButtons':
        return (
          <>
            <h3 className="text-xl font-bold text-gray-800 mb-4 break-all">
              {item.question}
            </h3>
            <div className="flex gap-4 mt-8 justify-center">
              <button
                onClick={!isEditing ? onNext : undefined}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                {item.yesText}
              </button>
              <button
                onClick={!isEditing ? onNext : undefined}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                {item.noText}
              </button>
            </div>
          </>
        )
      default:
        return null
    }
  }

  if (pages.length === 0) {
    return (
      <div className={cn(
        'relative h-full w-full bg-gray-100 flex items-center justify-center',
        className,
      )}
      >
        <p className="text-gray-500">صفحه‌ای وجود ندارد</p>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        'relative h-full w-full bg-white flex flex-col',
        className,
      )}
    >
      <BookProgressBar currentPageIndex={currentIndex} totalPages={pages.length} />

      <button
        onClick={onClose}
        className="absolute top-8 left-4 z-10 text-gray-700 hover:text-gray-900"
      >
        ✕
      </button>

      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto px-3 pt-28 pb-0 max-h-[80vh]"
      >
        <div className="max-w-2xl mx-auto flex flex-col h-full relative overflow-y-scroll macos-scrollbar">
          {/* Page title */}
          {currentPage.title && (
            <h2 className="text-2xl font-bold text-gray-800 mb-6 break-all">
              {currentPage.title}
            </h2>
          )}

          {/* Page items */}
          <div className="space-y-6">
            {currentPage.items.map(item => (
              <div key={item.id}>
                {renderItemContent(item)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex top-16 justify-between pointer-events-none">
        <Button
          size="icon"
          variant="link"
          onClick={onPrev}
          className="pointer-events-auto p-2 ml-4 rounded-full transition-colors"
          aria-label="صفحه قبلی"
          disabled={currentIndex === 0}
        >
          <ChevronRight size={32} className="text-gray-700" />
        </Button>
        <Button
          size="icon"
          variant="link"
          onClick={onNext}
          className="pointer-events-auto p-2 mr-4 rounded-full transition-colors"
          aria-label="صفحه بعدی"
          disabled={currentIndex === pages.length - 1}
        >
          <ChevronLeft size={32} className="text-gray-700" />
        </Button>
      </div>

      {contentRef.current
        && contentRef.current.scrollHeight > contentRef.current.clientHeight
        && contentRef.current.scrollTop + contentRef.current.clientHeight
        < contentRef.current.scrollHeight - 20 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div className="bg-black bg-opacity-50 text-white text-xs px-3 py-1 rounded-full">
            برای ادامه اسکرول کنید
          </div>
        </div>
      )}
    </div>
  )
}

BookCreator.displayName = 'BookCreator'

export { BookCreator }
