'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Star } from 'lucide-react'
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
  onIndexChange: (index: number) => void // Add this prop
  className?: string
  renderContent?: (page: Page) => React.ReactNode
}

function BookCreator({ ref, pages, currentIndex, onNext, onPrev, onClose, onIndexChange, className, renderContent }: BookCreatorProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [direction, setDirection] = React.useState<'up' | 'down'>('down')
  const getPageColor = (page: Page): string => {
    switch (page.type) {
      case 'content':
        return 'bg-blue-500' // Blue for content pages
      case 'image':
        return 'bg-green-500' // Green for image pages
      case 'quiz':
        return 'bg-yellow-500' // Purple for quiz pages
      case 'question':
        return 'bg-purple-500' // Yellow for question pages
      case 'letsGo':
        return 'bg-pink-500' // Indigo for "let's go" pages
      case 'rating':
        return 'bg-orange-500' // Pink for rating pages
      default:
        return 'bg-gray-500' // Default fallback
    }
  }
  React.useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [currentIndex])

  const handlePrev = () => {
    setDirection('up')
    onPrev()
  }

  const handleNext = () => {
    setDirection('down')
    onNext()
  }

  const handleIndicatorClick = (index: number) => {
    if (index > currentIndex) {
      setDirection('down')
    }
    else if (index < currentIndex) {
      setDirection('up')
    }
    onIndexChange(index)
  }

  const defaultRenderContent = (page: Page) => {
    switch (page.type) {
      case 'content':
        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 break-all">
              {page.title_fa}
            </h2>
            <h3 className="text-lg text-gray-600 mb-6 break-all">
              {page.title_en}
            </h3>
            <div className="prose max-w-none text-gray-700 break-all">
              {page.description}
            </div>
          </>
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
                onClick={handleNext}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                {page.yesText}
              </button>
              <button
                onClick={handleNext}
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
              onClick={handleNext}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {page.buttonText}
            </button>
            <div className="quick-replies">
              <button className="quick-reply celebration">🎉 Awesome!</button>
              <button className="quick-reply celebration">👍 Thanks!</button>
              <button className="quick-reply celebration">🔥 Lit!</button>
            </div>
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
                onClick={handleNext}
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

  const slideVariants = {
    enter: (direction: 'up' | 'down') => ({
      y: direction === 'up' ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: (direction: 'up' | 'down') => ({
      y: direction === 'up' ? '-100%' : '100%',
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    }),
  }

  return (
    <div
      ref={ref}
      className={cn(
        'relative h-full w-full bg-white flex overflow-hidden',
        className,
      )}
    >
      {/* Vertical page indicators */}
      <div className="absolute top-1/2 hover:w-6 w-5 -left-3 transition transition-all transform -translate-y-1/2 flex flex-col gap-0.25 z-10 items-end h-[calc(100%_-_32px)]">
        {pages.map((page, index) => (
          <button // Changed div to button
            key={index}
            onClick={() => handleIndicatorClick(index)} // Handle click
            className={cn(
              'w-full flex-grow transition-all relative origin-right first:rounded-tr-md last:rounded-br-md transform hover:translate-x-1 focus:outline-none',
              index === currentIndex
                ? `transform translate-x-1 rounded-r-md min-h-3 ${getPageColor(page)}` // Use the page-specific color for current indicator
                : `opacity-60 ${getPageColor(page)}`,
            )}
            style={{ height: `calc(100%/${pages?.length}px` }}
            aria-label={`Go to page ${index + 1}`}
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

      {/* Animated content area */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 p-8 overflow-y-auto"
            ref={contentRef}
          >
            <div className="max-w-2xl mx-auto flex flex-col h-full">
              {renderContent ? renderContent(pages[currentIndex]) : defaultRenderContent(pages[currentIndex])}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="absolute inset-0 flex flex-col items-center justify-between pointer-events-none">
        <Button
          size="icon"
          variant="ghost"
          onClick={handlePrev}
          className="pointer-events-auto p-2 mt-4 rounded-full hover:bg-gray-100"
          aria-label="Previous page"
        >
          <ChevronUp className="w-6 h-6 text-gray-700" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleNext}
          className="pointer-events-auto p-2 mb-4 rounded-full hover:bg-gray-100"
          aria-label="Next page"
        >
          <ChevronDown className="w-6 h-6 text-gray-700" />
        </Button>
      </div>

      {/* Scroll indicator */}
      {contentRef.current
        && contentRef.current.scrollHeight > contentRef.current.clientHeight
        && contentRef.current.scrollTop + contentRef.current.clientHeight
        < contentRef.current.scrollHeight - 20 && (
        <div className="absolute bottom-4 right-4">
          <div className="bg-black bg-opacity-50 text-white text-xs px-3 py-1 rounded-full rotate-90">
            Scroll to continue
          </div>
        </div>
      )}
    </div>
  )
}

BookCreator.displayName = 'BookCreator'

export { BookCreator }
