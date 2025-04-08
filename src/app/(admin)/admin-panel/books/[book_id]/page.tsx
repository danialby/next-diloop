'use client'

import { BookCreator } from '@/components/admin-panel/Books/BookCreator'
import BookDetailsCard from '@/components/admin-panel/Books/BookDetailsCard'
import MobileFrame from '@/components/admin-panel/Books/MobileFrame'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useAdminStore from '@/store/adminStore'
import { BookOpenText, BookPlus, Check, ChevronRight, ImageIcon, PlusCircle, Star, Stars, XCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useMemo, useState } from 'react'

// Type Definitions
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

const BookPage: React.FC = () => {
  // Data Fetching
  const { books_data } = useAdminStore()
  const params = useParams()
  const { book_id: BookId = 0 } = params

  const page_data = useMemo(() =>
    books_data?.find(item => item?.id === +BookId), [BookId, books_data])

  // State Management
  const [pages, setPages] = useState<Page[]>([])
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'content' | 'image' | 'quiz' | 'question' | 'letsGo' | 'rating'>('content')

  // Handle updates to page fields
  const handlePageChange = (field: string, value: any) => {
    setPages(prev => prev.map((page, index) =>
      index === currentPageIndex ? { ...page, [field]: value } : page,
    ))
  }

  // Create new empty page
  const addEmptyPage = (type: Page['type']) => {
    const newPage: Page = {
      id: `page-${Date.now()}`,
      type,
      ...(type === 'content'
        ? {
            title_fa: '',
            title_en: '',
            description: '',
          }
        : type === 'image'
          ? {
              title: '',
              imageUrl: '',
              caption: '',
            }
          : type === 'quiz'
            ? {
                question: '',
                options: ['', ''],
                correctAnswer: 0,
              }
            : type === 'question'
              ? {
                  question: '',
                  yesText: 'بله',
                  noText: 'خیر',
                }
              : type === 'letsGo'
                ? {
                    title: '',
                    description: '',
                    buttonText: 'شروع کنیم!',
                  }
                : {
                    question: '',
                    submitText: 'ثبت امتیاز',
                    rating: null,
                  }),
    }

    setPages(prev => [...prev, newPage])
    setCurrentPageIndex(pages.length)
    setActiveTab(type)
  }

  // Navigation functions
  const handlePageNavigation = (index: number) => {
    setCurrentPageIndex(index)
    setActiveTab(pages[index].type)
  }

  const handleDeletePage = (index: number) => {
    setPages(prev => prev.filter((_, i) => i !== index))
    setCurrentPageIndex(prev => Math.min(prev, pages.length - 2))
  }

  if (!page_data)
    return null

  const currentPage = pages[currentPageIndex]

  return (
    <>
      <BookDetailsCard book={page_data} />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          {/* Page Type Selection */}
          <div className="flex justify-between items-center mt-4">
            <Card className="grid grid-cols-3 grid-rows-2 grid-flow-row gap-2 border rounded-md p-1 w-full">
              {[
                { type: 'content', icon: BookPlus, color: 'blue', label: 'محتوا' },
                { type: 'image', icon: ImageIcon, color: 'green', label: 'تصویر' },
                { type: 'quiz', icon: Stars, color: 'yellow', label: 'آزمون' },
                { type: 'question', icon: Check, color: 'purple', label: 'سوال' },
                { type: 'letsGo', icon: ChevronRight, color: 'pink', label: 'شروع' },
                { type: 'rating', icon: Star, color: 'orange', label: 'امتیازدهی' },
              ].map(({ type, icon: Icon, color, label }) => (
                <Button
                  key={type}
                  variant="outline"
                  className={`flex-1 items-center justify-between bg-${color}-50 hover:bg-${color}-100 hover:border-${color}-200 hover:text-${color}-600 transition-all`}
                  size="sm"
                  onClick={() => addEmptyPage(type as Page['type'])}
                >
                  <span className="flex gap-1">
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </span>
                  <PlusCircle />
                </Button>
              ))}
            </Card>
          </div>

          {/* Page List */}
          <Card className="p-4">
            <h3 className="font-medium">صفحات کتاب</h3>
            {pages.length === 0
              ? (
                  <p className="text-gray-500 text-sm">هنوز صفحه‌ای اضافه نشده است</p>
                )
              : (
                  <div className="max-h-50 md:grid grid-cols-5 gap-1.5 overflow-y-scroll no-scrollbar p-3 macos-scrollbar bg-black/3 rounded-xl shadow shadow-md">
                    {pages.map((page, index) => {
                      const colorMap = {
                        content: 'blue',
                        image: 'green',
                        quiz: 'yellow',
                        question: 'purple',
                        letsGo: 'pink',
                        rating: 'orange',
                      }

                      const iconMap = {
                        content: BookOpenText,
                        image: ImageIcon,
                        quiz: Stars,
                        question: Check,
                        letsGo: ChevronRight,
                        rating: Star,
                      }

                      const IconComponent = iconMap[page.type]
                      const color = colorMap[page.type]

                      return (
                        <div
                          key={page.id}
                          className={`group flex items-center justify-between p-2 rounded-lg border relative cursor-pointer overflow-hidden scale-[0.95] 
                      ${index === currentPageIndex && '!scale-[1.1] border-2 flex-1 shadow shadow-lg'}
                      border-${color}-500 bg-${color}-50`}
                          onClick={() => handlePageNavigation(index)}
                        >
                          <div className="max-w-full">
                            <div className="flex items-start flex-col gap-1">
                              <span className="text-sm font-medium">
                                <IconComponent size={18} className={`text-${color}-600`} />
                              </span>
                              <span className="text-xs text-gray-600 truncate max-w-full">
                                {'question' in page
                                  ? page.question
                                  : 'title' in page
                                    ? page.title
                                    : page.type === 'quiz' ? 'سوال آزمون' : ''}
                              </span>
                            </div>
                          </div>
                          <Button
                            className="absolute -left-7 top-0 text-rose-400 z-1 transition-all group-hover:-left-1.5"
                            variant="link"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeletePage(index)
                            }}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                )}

            {/* Editor Section */}
            {currentPage && (
              <Card className="p-4 mt-4">
                {/* Content Page Editor */}
                {currentPage.type === 'content' && (
                  <div className="space-y-4">
                    <div>
                      <Label>عنوان فارسی</Label>
                      <Input
                        value={currentPage.title_fa}
                        onChange={e => handlePageChange('title_fa', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>عنوان انگلیسی</Label>
                      <Input
                        value={currentPage.title_en}
                        onChange={e => handlePageChange('title_en', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>توضیحات</Label>
                      <Textarea
                        value={currentPage.description}
                        onChange={e => handlePageChange('description', e.target.value)}
                        className="mt-2 min-h-[100px]"
                      />
                    </div>
                  </div>
                )}

                {/* Image Page Editor */}
                {currentPage.type === 'image' && (
                  <div className="space-y-4">
                    <div>
                      <Label>عنوان تصویر</Label>
                      <Input
                        value={currentPage.title}
                        onChange={e => handlePageChange('title', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>تصویر</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handlePageChange('imageUrl', e.target.files[0])
                          }
                        }}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>توضیح تصویر (اختیاری)</Label>
                      <Input
                        value={currentPage.caption || ''}
                        onChange={e => handlePageChange('caption', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>
                )}

                {/* Quiz Page Editor */}
                {currentPage.type === 'quiz' && (
                  <div className="space-y-4">
                    <div>
                      <Label>سوال</Label>
                      <Input
                        value={currentPage.question}
                        onChange={e => handlePageChange('question', e.target.value)}
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
                              handlePageChange('options', newOptions)
                            }}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newOptions = [...currentPage.options]
                              newOptions.splice(index, 1)
                              handlePageChange('options', newOptions)
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
                          handlePageChange('options', [...currentPage.options, ''])
                        }}
                      >
                        افزودن گزینه
                      </Button>
                    </div>
                    <div>
                      <Label>گزینه صحیح</Label>
                      <select
                        value={currentPage.correctAnswer}
                        onChange={e => handlePageChange('correctAnswer', Number(e.target.value))}
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
                )}

                {/* Question Page Editor */}
                {currentPage.type === 'question' && (
                  <div className="space-y-4">
                    <div>
                      <Label>سوال</Label>
                      <Input
                        value={currentPage.question}
                        onChange={e => handlePageChange('question', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>متن دکمه "بله"</Label>
                      <Input
                        value={currentPage.yesText}
                        onChange={e => handlePageChange('yesText', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>متن دکمه "خیر"</Label>
                      <Input
                        value={currentPage.noText}
                        onChange={e => handlePageChange('noText', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>
                )}

                {/* LetsGo Page Editor */}
                {currentPage.type === 'letsGo' && (
                  <div className="space-y-4">
                    <div>
                      <Label>عنوان</Label>
                      <Input
                        value={currentPage.title}
                        onChange={e => handlePageChange('title', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>توضیحات</Label>
                      <Textarea
                        value={currentPage.description}
                        onChange={e => handlePageChange('description', e.target.value)}
                        className="mt-2 min-h-[100px]"
                      />
                    </div>
                    <div>
                      <Label>متن دکمه</Label>
                      <Input
                        value={currentPage.buttonText}
                        onChange={e => handlePageChange('buttonText', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>
                )}

                {/* Rating Page Editor */}
                {currentPage.type === 'rating' && (
                  <div className="space-y-4">
                    <div>
                      <Label>سوال</Label>
                      <Input
                        value={currentPage.question}
                        onChange={e => handlePageChange('question', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>متن دکمه ثبت</Label>
                      <Input
                        value={currentPage.submitText}
                        onChange={e => handlePageChange('submitText', e.target.value)}
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
                            onClick={() => handlePageChange('rating', star)}
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
                )}
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
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">صفحه‌ای برای نمایش وجود ندارد</p>
                  </div>
                )}
          </MobileFrame>
        </div>
      </div>
    </>
  )
}

export default BookPage
