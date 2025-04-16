'use client'

import { BookCreator } from '@/components/admin-panel/Books/BookCreator'
import BookDetailsCard from '@/components/admin-panel/Books/BookDetailsCard'
import { PageCard } from '@/components/admin-panel/Books/BookPages/PageCard'
import MobileFrame from '@/components/admin-panel/Books/MobileFrame'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useAdminStore from '@/store/adminStore'
import clsx from 'clsx'
import {
  BookOpenText,
  BookPlus,
  Check,
  ChevronRight,
  ImageIcon,
  PlusCircle,
  Star,
  Stars,
} from 'lucide-react'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'

// Type Definitions
// type PageType = 'content' | 'image' | 'quiz' | 'question' | 'letsGo' | 'rating'
type PageType = 'content'

interface BasePage {
  id: string
  type: PageType
}

// interface ContentPage extends BasePage {
//   type: 'content'
//   title: string
//   description: string
// }
//
// interface ImagePage extends BasePage {
//   type: 'image'
//   title: string
//   imageUrl: string | File
//   caption?: string
// }
//
// interface QuizPage extends BasePage {
//   type: 'quiz'
//   question: string
//   options: string[]
//   correctAnswer: number
// }
//
// interface QuestionPage extends BasePage {
//   type: 'question'
//   question: string
//   yesText: string
//   noText: string
// }
//
// interface LetsGoPage extends BasePage {
//   type: 'letsGo'
//   title: string
//   description: string
//   buttonText: string
// }
//
// interface RatingPage extends BasePage {
//   type: 'rating'
//   question: string
//   submitText: string
//   rating: number | null
// }

interface ContentPage extends BasePage {
  type: 'content'
  title: string
}

interface ImageItem extends BasePage {
  type: 'image'
  title?: string
  imageUrl: string | File
  caption?: string
}

interface QuizItem extends BasePage {
  type: 'quiz'
  question: string
  options: string[]
  correctAnswer: number
}

interface QuestionItem extends BasePage {
  type: 'question'
  question: string
  yesText: string
  noText: string
}

interface LetsGoItem extends BasePage {
  type: 'letsGo'
  title: string
  description: string
  buttonText: string
}

interface RatingItem extends BasePage {
  type: 'rating'
  question: string
  submitText: string
  rating: number | null
}

// type Page = ContentPage | ImagePage | QuizPage | QuestionPage | LetsGoPage | RatingPage
type Page = ContentPage

// Configuration
const PAGE_TYPES = [
  { type: 'content', icon: BookPlus, color: 'blue', label: 'محتوا' },
  { type: 'image', icon: ImageIcon, color: 'green', label: 'تصویر' },
  { type: 'quiz', icon: Stars, color: 'yellow', label: 'آزمون' },
  { type: 'question', icon: Check, color: 'purple', label: 'سوال' },
  { type: 'letsGo', icon: ChevronRight, color: 'pink', label: 'شروع' },
  { type: 'rating', icon: Star, color: 'orange', label: 'امتیازدهی' },
] as const

const COLOR_CLASSES = {
  blue: {
    button: 'bg-blue-50 hover:bg-blue-100 border-blue-100 hover:border-blue-200 text-blue-600 hover:text-blue-700 text-xs',
    pageItem: 'border-blue-500 bg-blue-50 text-blue-600',
  },
  green: {
    button: 'bg-green-50 hover:bg-green-100 border-green-100 hover:border-green-200 text-green-600 hover:text-green-700 text-xs',
    pageItem: 'border-green-500 bg-green-50 text-green-600',
  },
  yellow: {
    button: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-100 hover:border-yellow-200 text-yellow-600 hover:text-yellow-700 text-xs',
    pageItem: 'border-yellow-500 bg-yellow-50 text-yellow-600',
  },
  purple: {
    button: 'bg-purple-50 hover:bg-purple-100 border-purple-100 hover:border-purple-200 text-purple-600 hover:text-purple-700 text-xs',
    pageItem: 'border-purple-500 bg-purple-50 text-purple-600',
  },
  pink: {
    button: 'bg-pink-50 hover:bg-pink-100 border-pink-100 hover:border-pink-200 text-pink-600 hover:text-pink-700 text-xs',
    pageItem: 'border-pink-500 bg-pink-50 text-pink-600',
  },
  orange: {
    button: 'bg-orange-50 hover:bg-orange-100 border-orange-100 hover:border-orange-200 text-orange-600 hover:text-orange-700 text-xs',
    pageItem: 'border-orange-500 bg-orange-50 text-orange-600',
  },
} as const

// const PAGE_ICONS = {
//   content: BookOpenText,
//   image: ImageIcon,
//   quiz: Stars,
//   question: Check,
//   letsGo: ChevronRight,
//   rating: Star,
// }
//
// const PAGE_COLORS: Record<PageType, keyof typeof COLOR_CLASSES> = {
//   content: 'blue',
//   image: 'green',
//   quiz: 'yellow',
//   question: 'purple',
//   letsGo: 'pink',
//   rating: 'orange',
// }

// Component
export default function BookEditor() {
  const { books_data } = useAdminStore()
  const { book_id: bookId = '0' } = useParams()

  const [pages, setPages] = useState<Page[]>([])
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  const bookData = useMemo(() =>
    books_data?.find(book => book.id === Number(bookId)), [bookId, books_data])

  if (!bookData)
    return null

  const currentPage = pages[currentPageIndex]

  // Handlers
  const handlePageChange = <T extends Page>(field: keyof T, value: T[keyof T]) => {
    setPages(prev => prev.map((page, index) =>
      index === currentPageIndex ? { ...page, [field]: value } : page,
    ))
  }

  const addEmptyPage = () => {
    const basePage = { id: `page-${Date.now()}` }

    const newPage = {
      ...basePage,
      ...{
        title: '',
        description: '',
      },
    } as Page

    setPages(prev => [...prev, newPage])
    setCurrentPageIndex(pages.length)
  }

  const handlePageNavigation = (index: number) => {
    if (index >= 0 && index < pages.length) {
      setCurrentPageIndex(index)
    }
  }

  const handleDeletePage = (index: number) => {
    console.log(index)
    setPages(prev => prev.filter((_, i) => i !== index))
    setCurrentPageIndex(prev => Math.min(prev, pages.length - 2))
  }

  // Render Functions
  const renderPageTypeButtons = () => (
    <Card className="grid grid-cols-3 grid-rows-2 gap-2 border rounded-md p-1 w-full">
      {PAGE_TYPES.map(({ type, icon: Icon, color, label }) => (
        <Button
          key={type}
          variant="outline"
          className={clsx(
            'flex-1 items-center justify-center md:justify-between transition-all !p-0 md:!px-2',
            COLOR_CLASSES[color].button,
          )}
          size="sm"
          onClick={() => addEmptyPage(type)}
        >
          <span className="flex gap-1 items-center">
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </span>
          <PlusCircle />
        </Button>
      ))}
    </Card>
  )

  const renderPageList = () => (
    <div className="max-h-50 grid grid-cols-5 gap-1.5 overflow-y-auto p-3 bg-black/5 rounded-xl shadow macos-scrollbar">
      {pages.map((page, index) => {
        // const IconComponent = PAGE_ICONS[page.type]
        // const color = PAGE_COLORS[page.type]

        return (

          <PageCard
            key={page?.id}
            page={page}
            index={index}
            className={clsx(
              'group flex items-center justify-between p-2 rounded-lg border min-h-16 relative bg-white',
              'relative cursor-pointer overflow-hidden scale-95 transition-transform',
              index === currentPageIndex && 'scale-110 border-2 shadow-lg',
            )}
            onNavigate={handlePageNavigation}
            onDelete={handleDeletePage}
          />

        )
      })}
      <Button variant="outline" onClick={() => addEmptyPage('content')} className="min-h-16">
        <PlusCircle />
      </Button>
    </div>
  )

  const renderEditor = () => {
    if (!currentPage)
      return null

    switch (currentPage.type) {
      case 'content':
        return (
          <div className="space-y-4">
            <div>
              <Label>عنوان</Label>
              <Input
                value={currentPage.title}
                onChange={e => handlePageChange<ContentPage>('title', e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        )

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <Label>عنوان تصویر</Label>
              <Input
                value={currentPage.title}
                onChange={e => handlePageChange<ImagePage>('title', e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label>تصویر</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={e => handlePageChange<ImagePage>(
                  'imageUrl',
                  e.target.files?.[0] || '',
                )}
                className="mt-2"
              />
            </div>
            <div>
              <Label>توضیح تصویر (اختیاری)</Label>
              <Input
                value={currentPage.caption || ''}
                onChange={e => handlePageChange<ImagePage>('caption', e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        )

      case 'quiz':
        return (
          <div className="space-y-4">
            <div>
              <Label>سوال</Label>
              <Input
                value={currentPage.question}
                onChange={e => handlePageChange<QuizPage>('question', e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="space-y-2">
              <Label>گزینه‌ها</Label>
              {currentPage.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...currentPage.options]
                      newOptions[index] = e.target.value
                      handlePageChange<QuizPage>('options', newOptions) // Now properly typed
                    }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newOptions = [...currentPage.options]
                      newOptions.splice(index, 1)
                      handlePageChange<QuizPage>('options', newOptions) // Now properly typed
                    }}
                  >
                    حذف
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  handlePageChange<QuizPage>('options', [...currentPage.options, '']) // Now properly typed
                }}
              >
                افزودن گزینه
              </Button>
            </div>
            <div>
              <Label>گزینه صحیح</Label>
              <select
                value={currentPage.correctAnswer}
                onChange={e => handlePageChange<QuizPage>(
                  'correctAnswer',
                  Number(e.target.value),
                )}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
              >
                {currentPage.options.map((_, index) => (
                  <option key={index} value={index}>
                    گزینه
                    {' '}
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )

      case 'question':
        return (
          <div className="space-y-4">
            <div>
              <Label>سوال</Label>
              <Input
                value={currentPage.question}
                onChange={e => handlePageChange<QuestionPage>('question', e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label>متن دکمه "بله"</Label>
              <Input
                value={currentPage.yesText}
                onChange={e => handlePageChange<QuestionPage>('yesText', e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label>متن دکمه "خیر"</Label>
              <Input
                value={currentPage.noText}
                onChange={e => handlePageChange<QuestionPage>('noText', e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        )

      case 'letsGo':
        return (
          <div className="space-y-4">
            <div>
              <Label>عنوان</Label>
              <Input
                value={currentPage.title}
                onChange={e => handlePageChange<LetsGoPage>('title', e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label>توضیحات</Label>
              <Textarea
                value={currentPage.description}
                onChange={e => handlePageChange<LetsGoPage>('description', e.target.value)}
                className="mt-2 min-h-[100px]"
              />
            </div>
            <div>
              <Label>متن دکمه</Label>
              <Input
                value={currentPage.buttonText}
                onChange={e => handlePageChange<LetsGoPage>('buttonText', e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        )

      case 'rating':
        return (
          <div className="space-y-4">
            <div>
              <Label>سوال</Label>
              <Input
                value={currentPage.question}
                onChange={e => handlePageChange<RatingPage>('question', e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label>متن دکمه ثبت</Label>
              <Input
                value={currentPage.submitText}
                onChange={e => handlePageChange<RatingPage>('submitText', e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label>پیش‌نمایش امتیاز</Label>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handlePageChange<RatingPage>('rating', star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        currentPage.rating && star <= currentPage.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      <BookDetailsCard book={bookData} />

      <div className="md:grid grid-cols-2 gap-4 flex flex-col">
        <div className="flex flex-col gap-2">

          {/* Page List */}
          <Card className="p-4">
            <h3 className="font-medium">صفحات کتاب</h3>
            { renderPageList() }

            {/* Editor Section */}
            {pages?.length > 0
              && (
                <Card className="p-4 mt-4">
                  <div className="space-y-4">
                    <div>
                      <Label>عنوان</Label>
                      <Input
                        value={currentPage.title}
                        onChange={e => handlePageChange<ContentPage>('title', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>
                  {renderEditor()}
                  {/* Page Type Selection */}
                  {renderPageTypeButtons()}
                </Card>
              )}
          </Card>
        </div>

        {/* Preview Section */}
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
