'use client'

import { cn } from '@/lib/utils'
import * as React from 'react'

interface ContentPage {
  id: string
  type: 'content'
  title_fa: string
  title_en: string
  description: string
}

interface ImagePage {
  id: string
  type: 'image'
  title: string
  imageUrl: string | File
  caption?: string
}

interface QuizPage {
  id: string
  type: 'quiz'
  question: string
  options: string[]
  correctAnswer: number
}

type Page = ContentPage | ImagePage | QuizPage

interface BookCreatorProps {
  pages: Page[]
  currentIndex: number
  onReorder?: (fromIndex: number, toIndex: number) => void
  onNext: () => void
  onPrev: () => void
  onClose: () => void
  className?: string
  renderContent?: (page: Page) => React.ReactNode
}

function BookCreator({ ref, pages, currentIndex,
  // onReorder,
  onNext, onPrev, onClose, className, renderContent }: BookCreatorProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null)
  const currentPage = pages[currentIndex]

  // Reset scroll position when page changes
  React.useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [currentIndex])

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index)
      return

    // onReorder(draggedIndex, index)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const defaultRenderContent = (page: Page) => {
    switch (page.type) {
      case 'content':
        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {page.title_fa}
            </h2>
            <h3 className="text-lg text-gray-600 mb-6">
              {page.title_en}
            </h3>
            <div className="prose max-w-none text-gray-700">
              {page.description}
            </div>
          </>
        )
      case 'image':
        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {page.title}
            </h2>
            <div className="mt-6">
              {typeof page.imageUrl === 'string'
                ? (
                    <img
                      src={page.imageUrl}
                      alt={page.title}
                      className="max-w-full h-auto rounded-lg"
                    />
                  )
                : (
                    <div className="bg-gray-200 p-8 rounded-lg text-center">
                      <p>Image preview would appear here</p>
                    </div>
                  )}
            </div>
            {page.caption && (
              <p className="mt-4 text-sm text-gray-500">{page.caption}</p>
            )}
          </>
        )
      case 'quiz':
        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              سوال آزمون
            </h2>
            <p className="text-lg mb-6">{page.question}</p>
            <div className="space-y-2">
              {page.options.map((option, idx) => (
                <div
                  key={idx}
                  className={`p-3 border rounded-lg ${
                    idx === page.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200'
                  }`}
                >
                  {option}
                </div>
              ))}
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
        <p className="text-gray-500">No pages added yet</p>
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
      {/* Draggable page indicators */}
      <div className="absolute top-10 left-0 right-0 flex justify-center gap-2 z-10">
        {pages.map((_, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={e => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={cn(
              'w-8 h-1 rounded-full cursor-grab active:cursor-grabbing',
              index === currentIndex ? 'bg-red-500' : 'bg-gray-300',
              draggedIndex === index && 'opacity-50',
            )}
          />
        ))}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-gray-700 hover:text-gray-900"
      >
        ✕
      </button>

      {/* Page content with fixed max height and scroll */}
      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto p-8 pt-16 pb-8 max-h-[80vh]"
      >
        <div className="max-w-2xl mx-auto">
          {renderContent ? renderContent(currentPage) : defaultRenderContent(currentPage)}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="absolute inset-0 flex pointer-events-none">
        <div
          className="w-1/2 h-full pointer-events-auto cursor-pointer"
          onClick={onPrev}
        />
        <div
          className="w-1/2 h-full pointer-events-auto cursor-pointer"
          onClick={onNext}
        />
      </div>

      {/* Scroll indicator */}
      {contentRef.current
        && contentRef.current.scrollHeight > contentRef.current.clientHeight
        && contentRef.current.scrollTop + contentRef.current.clientHeight < contentRef.current.scrollHeight - 20 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div className="bg-black bg-opacity-50 text-white text-xs px-3 py-1 rounded-full">
            Scroll to continue
          </div>
        </div>
      )}
    </div>
  )
}

BookCreator.displayName = 'BookCreator'

export { BookCreator }
