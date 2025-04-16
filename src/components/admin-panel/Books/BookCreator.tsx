'use client'

import BookProgressBar from '@/components/admin-panel/Books/BookPages/BookProgressBar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import * as React from 'react'

interface ContentPage {
  id: string
  type: 'content'
  title: string
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

interface QuestionPage {
  id: string
  type: 'question'
  question: string
  yesText: string
  noText: string
}

interface LetsGoPage {
  id: string
  type: 'letsGo'
  title: string
  description: string
  buttonText: string
}

interface RatingPage {
  id: string
  type: 'rating'
  question: string
  submitText: string
  rating: number | null
}

type Page = ContentPage | ImagePage | QuizPage | QuestionPage | LetsGoPage | RatingPage

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

function BookCreator({
  ref,
  pages,
  currentIndex,
  onNext,
  onPrev,
  onClose,
  className,
  renderContent,
}: BookCreatorProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const currentPage = pages[currentIndex]

  React.useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [currentIndex])

  const defaultRenderContent = (page: Page) => {
    switch (page.type) {
      case 'content':
        return (
          page.title
          && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-4 break-all">
                {page.title}
              </h2>
            </>
          )
        )
      case 'image':
        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 break-all">
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
                    <div className="bg-gray-200 p-8 rounded-lg text-center break-all">
                      <p>Image preview would appear here</p>
                    </div>
                  )}
            </div>
            {page.caption && (
              <p className="mt-4 text-sm text-gray-500 break-all">{page.caption}</p>
            )}
          </>
        )
      case 'quiz':
        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 break-all">
              سوال آزمون
            </h2>
            <p className="text-lg mb-6 break-all">{page.question}</p>
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
      case 'question':
        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 break-all">
              {page.question}
            </h2>
            <div className="flex gap-4 mt-8 justify-center">
              <button
                onClick={onNext}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                {page.yesText}
              </button>
              <button
                onClick={onNext}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                {page.noText}
              </button>
            </div>
          </>
        )
      case 'letsGo':
        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 break-all">
              {page.title}
            </h2>
            <div className="prose max-w-none text-gray-700 mb-8 break-all">
              {page.description}
            </div>
            <button
              onClick={onNext}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {page.buttonText}
            </button>
          </>
        )
      case 'rating':
        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 break-all">
              {page.question}
            </h2>
            <div className="flex flex-col items-center gap-6 mt-8">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      const updatedPages = [...pages]
                      const currentPage = updatedPages[currentIndex] as RatingPage
                      currentPage.rating = star
                    }}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        page.rating && star <= page.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <button
                onClick={onNext}
                disabled={page.rating === null}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  page.rating === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {page.submitText}
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
      <BookProgressBar currentPageIndex={currentIndex} totalPages={pages.length} />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-8 left-4 z-10 text-gray-700 hover:text-gray-900"
      >
        ✕
      </button>

      {/* Page content with fixed max height and scroll */}
      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto p-8 pt-28 pb-8 max-h-[80vh]"
      >
        <div className="max-w-2xl mx-auto flex flex-col h-full relative">
          {renderContent ? renderContent(currentPage) : defaultRenderContent(currentPage)}
        </div>
      </div>

      {/* Navigation controls with chevrons */}
      <div className="absolute inset-0 flex top-16 justify-between pointer-events-none">
        <Button
          size="icon"
          variant="link"
          onClick={onPrev}
          className="pointer-events-auto p-2 ml-4 rounded-full transition-colors"
          aria-label="Previous page"
          disabled={currentIndex === 0}
        >
          <ChevronRight size={32} className="text-gray-700" />
        </Button>
        <Button
          size="icon"
          variant="link"
          onClick={onNext}
          className="pointer-events-auto p-2 mr-4 rounded-full transition-colors"
          aria-label="Next page"
          disabled={currentIndex === pages?.length}
        >
          <ChevronLeft size={32} className="text-gray-700" />
        </Button>
      </div>

      {/* Scroll indicator */}
      {contentRef.current
        && contentRef.current.scrollHeight > contentRef.current.clientHeight
        && contentRef.current.scrollTop + contentRef.current.clientHeight
        < contentRef.current.scrollHeight - 20 && (
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
