// Optional - from shadcn
import React from 'react'

interface MobileFrameProps {
  children: React.ReactNode
  className?: string
  width?: string
  height?: string
}

function MobileFrame({
  children,
  className = '',
  width = 'w-[375px]',
  height = 'h-[667px]',
}: MobileFrameProps) {
  return (
    <div className={`flex justify-center items-center p-6 ${className}`}>
      {/* Mobile Frame Container */}
      <div className={`relative ${width} ${height} bg-gray-100 rounded-[40px] shadow-2xl border-[12px] border-gray-800 dark:border-gray-600 dark:bg-gray-800`}>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-gray-800 dark:bg-gray-600 rounded-b-xl z-10"></div>

        {/* Screen Area */}
        <div className="relative w-full h-full overflow-hidden rounded-[32px] bg-white dark:bg-gray-900">
          {/* Optional: Use shadcn AspectRatio if you want to maintain ratio */}
          {/* <AspectRatio ratio={9/16}> */}
          <div className="w-full h-full overflow-auto">
            {children}
          </div>
          {/* </AspectRatio> */}
        </div>

        {/* Home Button (optional) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-gray-300 dark:bg-gray-500"></div>
      </div>
    </div>
  )
}

export default MobileFrame
