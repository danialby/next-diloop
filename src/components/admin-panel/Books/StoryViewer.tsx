'use client'

import { cn } from '@/lib/utils'
import * as React from 'react'

interface Story {
  id: string
  title_fa: string
  title_en: string
  description: string
}

interface StoryProps {
  stories: Story[]
  currentIndex: number
  onNext: () => void
  onPrev: () => void
  onClose: () => void
  className?: string
}

function StoryViewer({ ref, stories, currentIndex, onNext, onPrev, onClose, className }: StoryProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const currentStory = stories[currentIndex]

  // Reset scroll position when story changes
  React.useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [currentIndex])

  const handleTouchStart = () => {
    // Pause any animations if needed
  }

  const handleTouchEnd = () => {
    // Resume any animations if needed
  }

  if (stories.length === 0) {
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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      {/* Simple colored page indicators */}
      <div className="absolute top-4 left-0 right-0 flex justify-center gap-2 z-10">
        {stories.map((_, index) => (
          <div
            key={index}
            className={cn(
              'w-8 h-1 rounded-full',
              index === currentIndex ? 'bg-red-500' : 'bg-gray-300',
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

      {/* Story content with fixed max height and scroll */}
      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto p-8 pt-16 pb-8 max-h-[80vh]"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {currentStory.title_fa}
          </h2>
          <h3 className="text-lg text-gray-600 mb-6">
            {currentStory.title_en}
          </h3>
          <div className="prose max-w-none text-gray-700">
            {currentStory.description}
          </div>
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

      {/* Scroll indicator (only shows when there's more content) */}
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

StoryViewer.displayName = 'StoryViewer'

export { StoryViewer }
