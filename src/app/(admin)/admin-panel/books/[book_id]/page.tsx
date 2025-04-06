'use client'

import BookDetailsCard from '@/components/admin-panel/Books/BookDetailsCard'
import { StoryViewer } from '@/components/admin-panel/Books/StoryViewer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import useAdminStore from '@/store/adminStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookPlus, ImagePlus, Plus, Stars } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface ContentPage {
  title_fa: string
  title_en: string
  description: string
}

interface QuizQuestion {
  quiz_id: string
  type: string
  sub_type: string
  settings: string
  q_order: string
}

interface QuizAnswer {
  id: number
  text: string
}

interface Quiz {
  title: string
  description: string
  answers: Array<QuizAnswer>
}

const BookPage: React.FC = () => {
  const {
    books_data,
  } = useAdminStore()

  const params = useParams()
  const { book_id: BookId = 0 } = params

  const page_data = useMemo(() => {
    return books_data?.filter(item => item?.id === +BookId)[0]
  }, [BookId, books_data])

  const [ContentPage, setContentPage] = useState<ContentPage>({
    title_fa: '',
    title_en: '',
    description: '',
  })

  const [pages, setPages] = useState<ContentPage[]>([])

  const FormSchema = z.object({
    title_fa: z.string().min(2, {
      message: 'عنوان فارسی حداقل باید ۲ کاراکتر باشد',
    }),
    title_en: z.string().min(2, {
      message: 'نام انگلیسی حداقل باید ۲ کاراکتر باشد',
    }),
    description: z.any(),
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title_fa: '',
      title_en: '',
      description: '',
    },
  })
  // const [ImagePage, setImagePage] = useState<File | string>('')
  // const [QuizPage, setQuizPage] = useState<Quiz>(
  //   {
  //     title: '',
  //     description: '',
  //     answers: [{
  //       id: 0,
  //       text: '',
  //     }],
  //   },
  // )
  //
  // const updateAnswers = (answer) => {
  //   setQuizPage(previousState => {
  //     return { ...previousState }
  //   });
  // }
  const addPage = (pageData: ContentPage) => {
    setPages(prevState => [...prevState, pageData])
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addPage({
      title_en: data?.title_en,
      title_fa: data?.title_fa,
      description: data?.description,
    })
  }
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  const handleNextPage = () => {
    setCurrentPageIndex(prev =>
      prev < pages.length - 1 ? prev + 1 : 0,
    )
  }

  const handlePrevPage = () => {
    setCurrentPageIndex(prev =>
      prev > 0 ? prev - 1 : pages.length - 1,
    )
  }
  return (
    page_data
    && (
      <>
        <BookDetailsCard book={page_data} />

        <Card className="grid grid-cols-2 divide-x h-full w-full py-0">
          <div className="w-full flex justify-center p-3">
            <Tabs defaultValue="Page" className="w-full dir-rtl">
              <TabsList>
                <TabsTrigger value="Page">
                  <BookPlus />
                  صفحه
                </TabsTrigger>
                <TabsTrigger value="Image">
                  <ImagePlus />
                  تصویر
                </TabsTrigger>
                <TabsTrigger value="Quiz">
                  {' '}
                  <Stars />
                  آزمون
                </TabsTrigger>
              </TabsList>
              <TabsContent value="Page">
                <div className="flex flex-col gap-1">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full gap-x-3 grid grid-cols-2 space-y-4">
                      <FormField
                        control={form.control}
                        name="title_fa"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>عنوان فارسی</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="title_en"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>نام انگلیسی</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>توضیحات</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={5} className="h-[150px] pb-[100px] overflow-y-scroll" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-1/3 self-end">
                        <Plus />
                        افزودن
                      </Button>
                    </form>
                  </Form>
                </div>
              </TabsContent>
              <TabsContent value="Image">
                <div className="flex flex-col gap-2">
                  <Label>تصویر</Label>
                  <Input type="file" />
                  <Button className="w-1/3 self-end">
                    <Plus />
                    افزودن
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="Quiz">
                {/* <div className="flex flex-col gap-3"> */}
                {/*  <div className="flex flex-col gap-1"> */}
                {/*    <Label>عنوان</Label> */}
                {/*    <Input value={QuizPage?.title} /> */}
                {/*  </div> */}
                {/*  <div className="flex flex-col gap-1"> */}
                {/*    <Label>متن</Label> */}
                {/*    <Textarea value={QuizPage?.description} /> */}
                {/*  </div> */}
                {/*  <div className="flex flex-col gap-1"> */}
                {/*    <Label> */}
                {/*      گزینه ها */}
                {/*    </Label> */}
                {/*    { */}
                {/*      QuizPage?.answers.length > 1 */}
                {/*      && (QuizPage?.answers.map((item, index) => { */}
                {/*        return ( */}
                {/*          <div className="flex" key={index}> */}
                {/*            <Input value={item?.text} /> */}
                {/*            <Button size="icon" className="rounded-full" variant="outline"> */}
                {/*              <Plus /> */}
                {/*            </Button> */}
                {/*          </div> */}
                {/*        ) */}
                {/*      }) */}
                {/*      ) */}
                {/*    } */}
                {/*    <div className="flex"> */}
                {/*      <Input value="" /> */}
                {/*      <Button size="icon" className="rounded-full" variant="outline" onClick={() => }> */}
                {/*        <Plus /> */}
                {/*      </Button> */}
                {/*    </div> */}
                {/*  </div> */}
                {/*  <Button className="w-1/3 self-end"> */}
                {/*    <Plus /> */}
                {/*    افزودن */}
                {/*  </Button> */}
                {/* </div> */}
              </TabsContent>
            </Tabs>
          </div>
          <div className="w-full">
            {/* { JSON.stringify(pages)} */}
            <StoryViewer
              stories={pages.map((page, index) => ({
                id: `page-${index}`,
                ...page,
              }))}
              currentIndex={currentPageIndex}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
              onClose={undefined}
            />
          </div>
        </Card>
      </>
    )
  )
}

export default BookPage
