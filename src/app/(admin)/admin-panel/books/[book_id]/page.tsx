'use client'

import type { Descendant } from 'slate'
import { BookCreator } from '@/components/admin-panel/Books/BookCreator'
import BookDetailsCard from '@/components/admin-panel/Books/BookDetailsCard'
import MobileFrame from '@/components/admin-panel/Books/MobileFrame'

import {
  BookOpenText,
} from 'lucide-react'
import React, { useCallback, useMemo } from 'react'
import { createEditor, Node } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, withReact } from 'slate-react'

// Type Definitions
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
  content: Descendant[]
}

// ... (other interface definitions remain the same)

// Configuration
const PAGE_ITEM_TYPES = [
  // ... (same as before)
] as const

// Initial value for Slate editor with RTL support
const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'متن جدید', direction: 'rtl' }],
  },
]

// Helper function to safely render Slate content
function renderSlateContent(content: Descendant[]) {
  return content.map((node, i) => {
    if (!Node.isNode(node))
      return null

    if ('text' in node) {
      return (
        <span key={i} dir="rtl" style={{ textAlign: 'right' }}>
          {node.text}
        </span>
      )
    }

    const children = node.children?.map((child, j) => {
      if ('text' in child) {
        return (
          <span key={j} dir="rtl" style={{ textAlign: 'right' }}>
            {child.text}
          </span>
        )
      }
      return null
    })

    switch (node.type) {
      case 'paragraph':
        return (
          <p key={i} dir="rtl" style={{ textAlign: 'right' }}>
            {children}
          </p>
        )
      case 'heading':
        return (
          <h1 key={i} dir="rtl" style={{ textAlign: 'right' }}>
            {children}
          </h1>
        )
      default:
        return (
          <div key={i} dir="rtl" style={{ textAlign: 'right' }}>
            {children}
          </div>
        )
    }
  })
}

export default function BookEditor() {
  // ... (previous state and hooks remain the same)

  // Create a stable editor reference
  const TextEditor = useCallback(({ itemId }: { itemId: string }) => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const currentItem = pages[currentPageIndex].items.find(
      item => item.id === itemId,
    ) as TextItem | undefined

    // Normalize content to ensure valid Slate value
    const normalizedContent = useMemo(() => {
      try {
        if (!currentItem?.content || !Array.isArray(currentItem.content)) {
          return initialValue
        }
        return currentItem.content
      }
      catch (e) {
        return initialValue
      }
    }, [currentItem])

    return (
      <Slate
        editor={editor}
        value={normalizedContent}
        onChange={(newValue) => {
          handleItemChange(itemId, 'content', newValue)
        }}
      >
        <Editable
          className="min-h-[100px] border rounded-md p-2 mt-2 bg-white"
          placeholder="محتوا را وارد کنید..."
          dir="rtl"
          style={{ textAlign: 'right' }}
        />
      </Slate>
    )
  }, [currentPageIndex, pages])

  // Update BookCreator component usage
  const renderBookPreview = () => (
    <BookCreator
      pages={pages}
      currentIndex={currentPageIndex}
      onNext={() => setCurrentPageIndex(prev => (prev < pages.length - 1 ? prev + 1 : 0))}
      onPrev={() => setCurrentPageIndex(prev => (prev > 0 ? prev - 1 : pages.length - 1))}
      onClose={() => handleDeletePage(currentPageIndex)}
      renderSlateContent={renderSlateContent}
    />
  )

  // ... (rest of the component remains the same, except update the MobileFrame section)

  return (
    <>
      <BookDetailsCard book={bookData} />

      <div className="md:grid grid-cols-2 gap-4 flex flex-col">
        <div className="flex flex-col gap-4">
          {renderPageList()}
          {/* ... other components */}
        </div>

        <div className="w-full">
          <MobileFrame>
            {pages.length > 0
              ? renderBookPreview()
              : (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                    <BookOpenText className="w-12 h-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-2">
                      کتابی برای نمایش وجود ندارد
                    </h3>
                    <p className="text-sm text-gray-400">
                      برای شروع، یک صفحه جدید اضافه کنید
                    </p>
                  </div>
                )}
          </MobileFrame>
        </div>
      </div>
    </>
  )
}
