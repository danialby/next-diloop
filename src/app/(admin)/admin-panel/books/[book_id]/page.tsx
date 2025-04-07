'use client'

import { BookCreator } from '@/components/admin-panel/Books/BookCreator'
import BookDetailsCard from '@/components/admin-panel/Books/BookDetailsCard'
import MobileFrame from '@/components/admin-panel/Books/MobileFrame'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import useAdminStore from '@/store/adminStore'
import { BookPlus, ImagePlus, Stars, Trash2 } from 'lucide-react'
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

type Page = ContentPage | ImagePage | QuizPage

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
  const [activeTab, setActiveTab] = useState<'content' | 'image' | 'quiz'>('content')
  const [editingPageId, setEditingPageId] = useState<string | null>(null)

  // Handle real-time updates
  const handleContentChange = (field: keyof ContentPage, value: string) => {
    if (!editingPageId)
      return
    setPages(prev => prev.map(page =>
      page.id === editingPageId && page.type === 'content'
        ? { ...page, [field]: value }
        : page,
    ))
  }

  const handleImageChange = (field: keyof ImagePage, value: string | File) => {
    if (!editingPageId)
      return
    setPages(prev => prev.map(page =>
      page.id === editingPageId && page.type === 'image'
        ? { ...page, [field]: value }
        : page,
    ))
  }

  const handleQuizChange = (field: keyof QuizPage, value: any) => {
    if (!editingPageId)
      return
    setPages(prev => prev.map(page =>
      page.id === editingPageId && page.type === 'quiz'
        ? { ...page, [field]: value }
        : page,
    ))
  }

  // Add new empty page
  const addEmptyPage = (type: 'content' | 'image' | 'quiz') => {
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
          : {
              question: '',
              options: ['', ''],
              correctAnswer: 0,
            }),
    }

    setPages(prev => [...prev, newPage])
    setCurrentPageIndex(pages.length)
    setEditingPageId(newPage.id)
    setActiveTab(type)
  }

  // Navigation and management
  const handlePageNavigation = (index: number) => {
    setCurrentPageIndex(index)
    setEditingPageId(pages[index].id)
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

      <div className="flex flex-col gap-4">
        {/* Page List Section */}
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">صفحات کتاب</h3>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => addEmptyPage('content')}>
                <BookPlus className="w-4 h-4 mr-2" />
                صفحه محتوا
              </Button>
              <Button size="sm" onClick={() => addEmptyPage('image')}>
                <ImagePlus className="w-4 h-4 mr-2" />
                صفحه تصویر
              </Button>
              <Button size="sm" onClick={() => addEmptyPage('quiz')}>
                <Stars className="w-4 h-4 mr-2" />
                صفحه آزمون
              </Button>
            </div>
          </div>

          {pages.length === 0
            ? (
                <p className="text-gray-500 text-sm">هنوز صفحه‌ای اضافه نشده است</p>
              )
            : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {pages.map((page, index) => (
                    <div
                      key={page.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        currentPageIndex === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div
                        className="flex-1 cursor-pointer"
                        onClick={() => handlePageNavigation(index)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {page.type === 'content'
                              ? 'صفحه محتوا'
                              : page.type === 'image' ? 'صفحه تصویر' : 'صفحه آزمون'}
                          </span>
                          {page.type === 'content' && page.title_fa && (
                            <span className="text-sm text-gray-600 truncate">
                              -
                              {page.title_fa}
                            </span>
                          )}
                          {page.type === 'image' && page.title && (
                            <span className="text-sm text-gray-600 truncate">
                              -
                              {page.title}
                            </span>
                          )}
                          {page.type === 'quiz' && page.question && (
                            <span className="text-sm text-gray-600 truncate">
                              -
                              {page.question}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePage(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Editor Section */}
          {currentPage && (
            <Card className="p-4">
              <Tabs value={activeTab} className="w-full dir-rtl">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content" onClick={() => setActiveTab('content')}>
                    محتوا
                  </TabsTrigger>
                  <TabsTrigger value="image" onClick={() => setActiveTab('image')}>
                    تصویر
                  </TabsTrigger>
                  <TabsTrigger value="quiz" onClick={() => setActiveTab('quiz')}>
                    آزمون
                  </TabsTrigger>
                </TabsList>

                {/* Content Editor */}
                {currentPage.type === 'content' && (
                  <TabsContent value="content" className="mt-4 space-y-4">
                    <div>
                      <Label>عنوان فارسی</Label>
                      <Input
                        value={currentPage.title_fa}
                        onChange={e => handleContentChange('title_fa', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>عنوان انگلیسی</Label>
                      <Input
                        value={currentPage.title_en}
                        onChange={e => handleContentChange('title_en', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>توضیحات</Label>
                      <Textarea
                        value={currentPage.description}
                        onChange={e => handleContentChange('description', e.target.value)}
                        className="mt-2 min-h-[100px]"
                      />
                    </div>
                  </TabsContent>
                )}

                {/* Image Editor */}
                {currentPage.type === 'image' && (
                  <TabsContent value="image" className="mt-4 space-y-4">
                    <div>
                      <Label>عنوان تصویر</Label>
                      <Input
                        value={currentPage.title}
                        onChange={e => handleImageChange('title', e.target.value)}
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
                            handleImageChange('imageUrl', e.target.files[0])
                          }
                        }}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>توضیح تصویر (اختیاری)</Label>
                      <Input
                        value={currentPage.caption || ''}
                        onChange={e => handleImageChange('caption', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </TabsContent>
                )}

                {/* Quiz Editor */}
                {currentPage.type === 'quiz' && (
                  <TabsContent value="quiz" className="mt-4 space-y-4">
                    <div>
                      <Label>سوال</Label>
                      <Input
                        value={currentPage.question}
                        onChange={e => handleQuizChange('question', e.target.value)}
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
                              handleQuizChange('options', newOptions)
                            }}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newOptions = [...currentPage.options]
                              newOptions.splice(index, 1)
                              handleQuizChange('options', newOptions)
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
                          handleQuizChange('options', [...currentPage.options, ''])
                        }}
                      >
                        افزودن گزینه
                      </Button>
                    </div>
                    <div>
                      <Label>گزینه صحیح</Label>
                      <select
                        value={currentPage.correctAnswer}
                        onChange={e => handleQuizChange('correctAnswer', Number(e.target.value))}
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
                  </TabsContent>
                )}
              </Tabs>
            </Card>
          )}

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
      </div>
    </>
  )
}

export default BookPage
