import { cn } from '@/lib/utils'
import * as React from 'react'

interface BookProgressBarProps {
  currentPageIndex: number
  totalPages: number
}

export default function BookProgressBar({
  currentPageIndex,
  totalPages,
}: BookProgressBarProps) {
  const positionPercentage = totalPages > 1
    ? 3 + (90 * (currentPageIndex / (totalPages - 1)))
    : 50

  return (
    <div className="absolute top-19.5 left-10.5 flex justify-center z-10 w-full max-w-[calc(100%_-_84px)] bg-green-600 rounded-full h-2.5">
      <div
        className={cn(
          'w-1.5 h-1.5 absolute rounded-full bg-white z-1 top-0.5',
        )}
        style={{
          right: `${positionPercentage}%`,
          transform: 'translateX(-50%)',
          transition: 'right 0.3s ease',
        }}
      />
    </div>
  )
}
