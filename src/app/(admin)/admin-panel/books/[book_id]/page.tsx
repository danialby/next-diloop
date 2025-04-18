'use client'

import { BookCreator } from '@/components/admin-panel/Books/BookCreator'
import BookDetailsCard from '@/components/admin-panel/Books/BookDetailsCard'
import MobileFrame from '@/components/admin-panel/Books/MobileFrame'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import useAdminStore from '@/store/adminStore'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { clsx } from 'clsx'
import {
  BookOpenText,
  Check,
  CheckSquare,
  GripVertical,
  Heading1,
  Heart,
  ImageIcon,
  List,
  PlusCircle,
  Smile,
  Star,
  Text,
  Trash2,
  Video,
} from 'lucide-react'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'

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
  content: string
}

interface RatingItem extends BasePageItem {
  type: 'rating'
  question: string
  iconShape: 'star' | 'heart' | 'smiley'
  maxRating: number
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

// Configuration
const PAGE_ITEM_TYPES = [
  { type: 'heading', icon: Heading1, color: 'blue', label: 'عنوان' },
  { type: 'text', icon: Text, color: 'blue', label: 'متن' },
  { type: 'rating', icon: Star, color: 'yellow', label: 'امتیازدهی' },
  { type: 'question', icon: List, color: 'purple', label: 'سوال چند گزینه‌ای' },
  { type: 'image', icon: ImageIcon, color: 'green', label: 'تصویر' },
  { type: 'video', icon: Video, color: 'green', label: 'ویدیو' },
  { type: 'button', icon: CheckSquare, color: 'pink', label: 'دکمه' },
  { type: 'yesNoButtons', icon: Check, color: 'purple', label: 'بله/خیر' },
] as const

const RATING_ICONS = {
  star: Star,
  heart: Heart,
  smiley: Smile,
}

const COLOR_CLASSES = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-600',
  },
  yellow: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-600',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-600',
  },
  pink: {
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    text: 'text-pink-600',
  },
} as const

export default function BookEditor() {
  const { books_data } = useAdminStore()
  const { book_id: bookId = '0' } = useParams()

  const [pages, setPages] = useState<Page[]>([{
    id: 'page-1',
    title: 'صفحه جدید',
    items: [],
  }])
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [expandedPage, setExpandedPage] = useState<string | null>(null)

  const bookData = useMemo(() =>
    books_data?.find(book => book.id === Number(bookId)), [bookId, books_data])

  if (!bookData)
    return null

  const currentPage = pages[currentPageIndex]

  // Handlers
  const handlePageTitleChange = (pageId: string, value: string) => {
    setPages(prev => prev.map(page =>
      page.id === pageId ? { ...page, title: value } : page,
    ))
  }

  const handleAddNewPage = () => {
    const newPage: Page = {
      id: `page-${Date.now()}`,
      title: `صفحه ${pages.length + 1}`,
      items: [],
    }
    setPages(prev => [...prev, newPage])
    setCurrentPageIndex(pages.length)
    setExpandedPage(newPage.id)
  }

  const handleDeletePage = (pageId: string) => {
    setPages(prev => prev.filter(page => page.id !== pageId))
    setCurrentPageIndex(prev => Math.min(prev, pages.length - 2))
    setExpandedPage(null)
  }

  const onPageDragEnd = (result: any) => {
    if (!result.destination)
      return

    const newPages = [...pages]
    const [removed] = newPages.splice(result.source.index, 1)
    newPages.splice(result.destination.index, 0, removed)

    setPages(newPages)

    // Update current page index if needed
    const activePageId = pages[currentPageIndex].id
    const newIndex = newPages.findIndex(p => p.id === activePageId)
    if (newIndex !== currentPageIndex) {
      setCurrentPageIndex(newIndex)
    }
  }

  // Render Functions
  const renderPageAccordions = () => (
    <Card>
      <CardHeader>
        <CardTitle>صفحات کتاب</CardTitle>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={onPageDragEnd}>
          <Droppable droppableId="pages">
            {provided => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {pages.map((page, index) => (
                  <Draggable key={page.id} draggableId={page.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={clsx(
                          'border rounded-lg overflow-hidden',
                          snapshot.isDragging && 'shadow-lg bg-white z-50',
                        )}
                      >
                        <Accordion
                          type="single"
                          value={expandedPage || ''}
                          onValueChange={setExpandedPage}
                        >
                          <AccordionItem value={page.id}>
                            <div className={clsx(
                              'flex items-center px-4 py-3',
                              COLOR_CLASSES.blue.bg,
                              COLOR_CLASSES.blue.border,
                              currentPageIndex === index && 'border-l-4 border-l-blue-500',
                            )}
                            >
                              <div
                                {...provided.dragHandleProps}
                                className="p-1 mr-2 text-gray-400 hover:text-gray-600 cursor-grab"
                              >
                                <GripVertical className="w-4 h-4" />
                              </div>

                              <AccordionTrigger className="flex-1 hover:no-underline">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">
                                    {page.title || `صفحه ${index + 1}`}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    (
                                    {page.items.length}
                                    {' '}
                                    آیتم)
                                  </span>
                                </div>
                              </AccordionTrigger>

                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-600"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeletePage(page.id)
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>

                            <AccordionContent>
                              <div className="p-4 space-y-4">
                                <div>
                                  <Label>عنوان صفحه</Label>
                                  <Input
                                    value={page.title}
                                    onChange={e => handlePageTitleChange(page.id, e.target.value)}
                                    className="mt-2"
                                  />
                                </div>

                                <Button
                                  variant="outline"
                                  className="w-full"
                                  onClick={() => setCurrentPageIndex(index)}
                                >
                                  {currentPageIndex === index ? 'در حال ویرایش' : 'انتخاب برای ویرایش'}
                                </Button>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}

                <Button
                  variant="outline"
                  onClick={handleAddNewPage}
                  className="w-full mt-2"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  افزودن صفحه جدید
                </Button>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </CardContent>
    </Card>
  )

  return (
    <>
      <BookDetailsCard book={bookData} />

      <div className="md:grid grid-cols-2 gap-4 flex flex-col">
        <div className="flex flex-col gap-4">
          {renderPageAccordions()}

          {/* Page content editor would go here */}
        </div>

        <div className="w-full">
          <MobileFrame>
            {pages.length > 0
              ? (
                  <BookCreator
                    pages={pages}
                    currentIndex={currentPageIndex}
                    onNext={() => setCurrentPageIndex(prev => (prev < pages.length - 1 ? prev + 1 : 0))}
                    onPrev={() => setCurrentPageIndex(prev => (prev > 0 ? prev - 1 : pages.length - 1))}
                    onClose={() => handleDeletePage(pages[currentPageIndex].id)}
                  />
                )
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
