'use client'

import { BookCreator } from '@/components/admin-panel/Books/BookCreator'
import BookDetailsCard from '@/components/admin-panel/Books/BookDetailsCard'
import { PageCard } from '@/components/admin-panel/Books/BookPages/PageCard'
import MobileFrame from '@/components/admin-panel/Books/MobileFrame'
// Import the Slate editor factory.
import { createEditor } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
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

// Type Definitions (same as before)
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
    button: 'bg-blue-50 hover:bg-blue-100 border-blue-100 hover:border-blue-200 text-blue-600 hover:text-blue-700',
    pageItem: 'border-blue-500 bg-blue-50 text-blue-600',
  },
  green: {
    button: 'bg-green-50 hover:bg-green-100 border-green-100 hover:border-green-200 text-green-600 hover:text-green-700',
    pageItem: 'border-green-500 bg-green-50 text-green-600',
  },
  yellow: {
    button: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-100 hover:border-yellow-200 text-yellow-600 hover:text-yellow-700',
    pageItem: 'border-yellow-500 bg-yellow-50 text-yellow-600',
  },
  purple: {
    button: 'bg-purple-50 hover:bg-purple-100 border-purple-100 hover:border-purple-200 text-purple-600 hover:text-purple-700',
    pageItem: 'border-purple-500 bg-purple-50 text-purple-600',
  },
  pink: {
    button: 'bg-pink-50 hover:bg-pink-100 border-pink-100 hover:border-pink-200 text-pink-600 hover:text-pink-700',
    pageItem: 'border-pink-500 bg-pink-50 text-pink-600',
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
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const bookData = useMemo(() =>
      books_data?.find(book => book.id === Number(bookId)), [bookId, books_data])

  if (!bookData)
    return null

  const currentPage = pages[currentPageIndex]

  // Handlers
  const handlePageTitleChange = (value: string) => {
    setPages(prev => prev.map((page, index) =>
        index === currentPageIndex ? { ...page, title: value } : page,
    ))
  }

  const handleItemChange = (itemId: string, field: string, value: any) => {
    setPages(prev => prev.map((page, index) => {
      if (index !== currentPageIndex)
        return page

      return {
        ...page,
        items: page.items.map((item) => {
          if (item.id !== itemId)
            return item
          return { ...item, [field]: value }
        }),
      }
    }))
  }

  const addNewPage = () => {
    const newPage: Page = {
      id: `page-${Date.now()}`,
      title: `صفحه ${pages.length + 1}`,
      items: [],
    }
    setPages(prev => [...prev, newPage])
    setCurrentPageIndex(pages.length)
    setExpandedItems([])
  }

  const addNewItem = (type: PageItemType) => {
    const baseItem = { id: `item-${Date.now()}`, type }

    let newItem: PageItem

    switch (type) {
      case 'heading':
        newItem = { ...baseItem, text: 'عنوان جدید', size: 'h1' } as HeadingItem
        break
      case 'text':
        newItem = { ...baseItem, content: 'متن جدید' } as TextItem
        break
      case 'rating':
        newItem = { ...baseItem, question: 'به این صفحه چه امتیازی می‌دهید؟', iconShape: 'star', maxRating: 5 } as RatingItem
        break
      case 'question':
        newItem = { ...baseItem, question: 'سوال جدید', options: ['گزینه ۱', 'گزینه ۲'] } as QuestionItem
        break
      case 'image':
        newItem = { ...baseItem, url: '', caption: '' } as ImageItem
        break
      case 'video':
        newItem = { ...baseItem, url: '' } as VideoItem
        break
      case 'button':
        newItem = { ...baseItem, text: 'کلیک کنید', action: '' } as ButtonItem
        break
      case 'yesNoButtons':
        newItem = { ...baseItem, question: 'آیا موافقید؟', yesText: 'بله', noText: 'خیر' } as YesNoButtonsItem
        break
      default:
        newItem = { ...baseItem } as any
    }

    setPages(prev => prev.map((page, index) => {
      if (index !== currentPageIndex)
        return page
      return {
        ...page,
        items: [...page.items, newItem],
      }
    }))

    setExpandedItems([...expandedItems, newItem.id])
  }

  const handlePageNavigation = (index: number) => {
    if (index >= 0 && index < pages.length) {
      setCurrentPageIndex(index)
      setExpandedItems([])
    }
  }

  const handleDeletePage = (index: number) => {
    setPages(prev => prev.filter((_, i) => i !== index))
    setCurrentPageIndex(prev => Math.min(prev, pages.length - 2))
  }

  const handleDeleteItem = (itemId: string) => {
    setPages(prev => prev.map((page, index) => {
      if (index !== currentPageIndex)
        return page
      return {
        ...page,
        items: page.items.filter(item => item.id !== itemId),
      }
    }))
    setExpandedItems(expandedItems.filter(id => id !== itemId))
  }

  const onDragEnd = (result: any) => {
    if (!result.destination)
      return

    const newItems = [...currentPage.items]
    const [removed] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, removed)

    setPages(prev => prev.map((page, index) => {
      if (index !== currentPageIndex)
        return page
      return {
        ...page,
        items: newItems,
      }
    }))
  }

  // Render Functions
  const renderPageItemButtons = () => (
      <Card className="p-4">
        <div className="grid grid-cols-4 gap-2">
          {PAGE_ITEM_TYPES.map(({ type, icon: Icon, color, label }) => (
              <Button
                  key={type}
                  variant="outline"
                  className={clsx(
                      'h-14 flex flex-col gap-1 text-xs',
                      COLOR_CLASSES[color].button,
                  )}
                  onClick={() => addNewItem(type)}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Button>
          ))}
        </div>
      </Card>
  )

  const renderPageList = () => (
      <Card>
        <CardHeader>
          <CardTitle>صفحات کتاب</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {pages.map((page, index) => (
                <PageCard
                    key={page.id}
                    page={page}
                    index={index}
                    isActive={index === currentPageIndex}
                    onNavigate={handlePageNavigation}
                    onDelete={handleDeletePage}
                />
            ))}
            <Button
                variant="outline"
                onClick={addNewPage}
                className="h-16 flex flex-col gap-1"
            >
              <PlusCircle className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
  )

  const renderItemEditor = (item: PageItem) => {
    switch (item.type) {
      case 'heading':
        return (
            <div className="space-y-4 p-4">
              <div>
                <Label>متن عنوان</Label>
                <Input
                    value={item.text}
                    onChange={e => handleItemChange(item.id, 'text', e.target.value)}
                    className="mt-2"
                />
              </div>
              <div>
                <Label>اندازه عنوان</Label>
                <Select
                    value={item.size}
                    onValueChange={value => handleItemChange(item.id, 'size', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="اندازه عنوان" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="h1">بزرگ (H1)</SelectItem>
                    <SelectItem value="h2">متوسط (H2)</SelectItem>
                    <SelectItem value="h3">کوچک (H3)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
        )

      case 'text':
        return (
            <div className="p-4">
              <Label>محتوا</Label>
              <Textarea
                  value={item.content}
                  onChange={e => handleItemChange(item.id, 'content', e.target.value)}
                  className="mt-2 min-h-[100px]"
              />
            </div>
        )

      case 'rating':
        return (
            <div className="space-y-4 p-4">
              <div>
                <Label>سوال</Label>
                <Input
                    value={item.question}
                    onChange={e => handleItemChange(item.id, 'question', e.target.value)}
                    className="mt-2"
                />
              </div>
              <div>
                <Label>شکل آیکون</Label>
                <div className="flex gap-4 mt-2">
                  {Object.entries(RATING_ICONS).map(([shape, Icon]) => (
                      <Button
                          key={shape}
                          variant={item.iconShape === shape ? 'default' : 'outline'}
                          onClick={() => handleItemChange(item.id, 'iconShape', shape)}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {shape === 'star' ? 'ستاره' : shape === 'heart' ? 'قلب' : 'صورتک'}
                      </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label>حداکثر امتیاز</Label>
                <Input
                    type="number"
                    min="3"
                    max="10"
                    value={item.maxRating}
                    onChange={e => handleItemChange(item.id, 'maxRating', Number(e.target.value))}
                    className="mt-2"
                />
              </div>
            </div>
        )

      case 'question':
        return (
            <div className="space-y-4 p-4">
              <div>
                <Label>سوال</Label>
                <Input
                    value={item.question}
                    onChange={e => handleItemChange(item.id, 'question', e.target.value)}
                    className="mt-2"
                />
              </div>
              <div className="space-y-2">
                <Label>گزینه‌ها</Label>
                {item.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...item.options]
                            newOptions[index] = e.target.value
                            handleItemChange(item.id, 'options', newOptions)
                          }}
                      />
                      <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newOptions = [...item.options]
                            newOptions.splice(index, 1)
                            handleItemChange(item.id, 'options', newOptions)
                          }}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                ))}
                <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() => {
                      handleItemChange(item.id, 'options', [...item.options, `گزینه ${item.options.length + 1}`])
                    }}
                >
                  افزودن گزینه
                </Button>
              </div>
            </div>
        )

      case 'image':
        return (
            <div className="space-y-4 p-4">
              <div>
                <Label>تصویر</Label>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={e => handleItemChange(
                        item.id,
                        'url',
                        e.target.files?.[0] || '',
                    )}
                    className="mt-2"
                />
              </div>
              <div>
                <Label>توضیح تصویر (اختیاری)</Label>
                <Input
                    value={item.caption || ''}
                    onChange={e => handleItemChange(item.id, 'caption', e.target.value)}
                    className="mt-2"
                />
              </div>
            </div>
        )

      case 'video':
        return (
            <div className="space-y-4 p-4">
              <div>
                <Label>لینک ویدیو</Label>
                <Input
                    value={item.url}
                    onChange={e => handleItemChange(item.id, 'url', e.target.value)}
                    className="mt-2"
                    placeholder="https://example.com/video.mp4"
                />
              </div>
            </div>
        )

      case 'button':
        return (
            <div className="space-y-4 p-4">
              <div>
                <Label>متن دکمه</Label>
                <Input
                    value={item.text}
                    onChange={e => handleItemChange(item.id, 'text', e.target.value)}
                    className="mt-2"
                />
              </div>
              <div>
                <Label>عملیات (اختیاری)</Label>
                <Input
                    value={item.action}
                    onChange={e => handleItemChange(item.id, 'action', e.target.value)}
                    className="mt-2"
                    placeholder="مثال: https://example.com یا #صفحه-بعدی"
                />
              </div>
            </div>
        )

      case 'yesNoButtons':
        return (
            <div className="space-y-4 p-4">
              <div>
                <Label>سوال</Label>
                <Input
                    value={item.question}
                    onChange={e => handleItemChange(item.id, 'question', e.target.value)}
                    className="mt-2"
                />
              </div>
              <div>
                <Label>متن دکمه "بله"</Label>
                <Input
                    value={item.yesText}
                    onChange={e => handleItemChange(item.id, 'yesText', e.target.value)}
                    className="mt-2"
                />
              </div>
              <div>
                <Label>متن دکمه "خیر"</Label>
                <Input
                    value={item.noText}
                    onChange={e => handleItemChange(item.id, 'noText', e.target.value)}
                    className="mt-2"
                />
              </div>
            </div>
        )

      default:
        return null
    }
  }

  const renderItemsList = () => (
      <Card>
        <CardHeader>
          <CardTitle>محتوای صفحه</CardTitle>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="items">
              {provided => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                    {currentPage.items.map((item, index) => {
                      const config = PAGE_ITEM_TYPES.find(t => t.type === item.type)
                      const Icon = config?.icon || BookOpenText

                      return (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {provided => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className="border rounded-lg overflow-hidden"
                                >
                                  <Accordion
                                      collapsible
                                      type="single"
                                      value={expandedItems}
                                      onValueChange={setExpandedItems}
                                  >
                                    <AccordionItem value={item.id}>
                                      <div className={clsx(
                                          'flex items-center justify-between !bg-gray-50',
                                          COLOR_CLASSES[config?.color || 'blue'].pageItem,
                                      )}
                                      >
                                        <AccordionTrigger className="px-2 py-0 hover:no-underline flex-1 w-full">
                                          <button
                                              {...provided.dragHandleProps}
                                              className=" text-gray-500 hover:text-gray-700"
                                          >
                                            <GripVertical className="w-4 h-4" />
                                          </button>
                                          <div className="flex items-center gap-2  w-full">
                                            <Icon className="w-4 h-4" />
                                            <span className="font-medium text-xs">
                                      {config?.label}
                                              {item.type === 'heading' && `: ${(item as HeadingItem).text}`}
                                    </span>
                                          </div>
                                        </AccordionTrigger>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500 hover:text-red-600"
                                            onClick={() => handleDeleteItem(item.id)}
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      </div>
                                      <AccordionContent>
                                        {renderItemEditor(item)}
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                </div>
                            )}
                          </Draggable>
                      )
                    })}
                    {provided.placeholder}
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
            {renderPageList()}

            <Card>
              <CardHeader>
                <CardTitle>عنوان صفحه</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                    value={currentPage.title}
                    onChange={e => handlePageTitleChange(e.target.value)}
                />
              </CardContent>
            </Card>

            {renderItemsList()}
            {renderPageItemButtons()}
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
                          onClose={() => handleDeletePage(currentPageIndex)}
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