'use client'

import type { Book, BookResponse, Category } from '@/types'

import { useAdminPanelRoutes } from '@/app/api/admin-panel/routes'
import { FilterableComboBox } from '@/components/admin-panel/FilterableComboBox'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ImageUploader } from '@/components/ui/image-uploader'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import useAdminStore from '@/store/adminStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  id: z.any(),
  title_en: z.string().min(2, {
    message: 'نام انگلیسی حداقل باید ۲ کاراکتر باشد',
  }),
  title_fa: z.string().min(2, {
    message: 'عنوان فارسی حداقل باید ۲ کاراکتر باشد',
  }),
  category_ids: z.any(),
  description: z.any(),
  is_active: z.any(),
  is_free: z.any(),
  tags: z.any(),
  poster_image: z.any(),
  score: z.any(),
})

interface UpdateBookFormProps {
  closeDialog: () => void
  sub_category?: Category
  book: BookResponse | undefined
}

export function UpdateBookForm({ closeDialog, book }: UpdateBookFormProps) {
  const { updateBook } = useAdminPanelRoutes()
  const [currentBook] = useState(book)
  const { selectedMainCategory, categories_data, updateStoreBook } = useAdminStore()

  const bookCategoryIds = useMemo(() => {
    return book?.categories?.map(item => item?.id)
  }, [book])
  const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState<number[] | undefined>(undefined)

  const [apiError, setApiError] = useState<Error | null>(null)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title_en: currentBook?.title_en,
      title_fa: currentBook?.title_fa,
      category_ids: bookCategoryIds,
      description: currentBook?.description,
      is_active: currentBook?.is_active,
      is_free: currentBook?.is_free,
      tags: currentBook?.tags,
      poster_image: currentBook?.poster_image,
      score: 0,
    },
  })

  const mutateUpdateBook = useMutation(
    {
      mutationFn: (data: Book) => updateBook(
        {
          id: currentBook?.id,
          title_en: data?.title_en,
          title_fa: data?.title_fa,
          description: data?.description,
          is_active: 1,
          is_free: 1,
          tags: [selectedMainCategory?.title],
          category_ids: selectedSubCategoryIds || bookCategoryIds,
          poster_image: currentBook?.poster_image || '',
          score: 0,
        },
      ),
      onSuccess: (response) => {
        // send code to number
        console.warn(response)
        // @ts-expect-error data in response
        updateStoreBook(response?.data?.book?.id, response?.data?.book,
        ).then(() => {
          closeDialog()
        })
      },
      onError: (error) => {
        setApiError(error)
        console.warn(error)
      },
    },
  )

  const subCategoriesByMain = useMemo(() => {
    return categories_data?.filter(item =>
    // @ts-expect-error tags can be null
      item?.tags?.includes(selectedMainCategory?.title) && item?.parent_id !== null,
    ) || []
  }, [categories_data, selectedMainCategory])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutateUpdateBook.mutate(data)
    // console.warn('Form submitted:')
    // console.warn(JSON.stringify(data, null, 2))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full gap-x-3 grid grid-cols-2 space-y-6">
        <FormField
          control={form.control}
          name="title_fa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عنوان فارسی</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="poster_image"
          render={field => (
            <FormItem className="col-span-1">
              <FormLabel>تصویر</FormLabel>
              <FormControl>
                <ImageUploader
                  image={field.value || currentBook?.poster_image}
                  onSelectImage={value => form.setValue('poster_image', value)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="col-span-1 flex flex-col">
          {/* <FormField */}
          {/*  control={form.control} */}
          {/*  name="category_ids" */}
          {/*  render={() => ( */}
          {/*    <div className="col-span-1 w-full gap-x-3"> */}
          {/*      <FormItem> */}
          {/*        <FormLabel>دسته بندی والد</FormLabel> */}
          {/*        <FormControl> */}
          {/*          <FilterableComboBox */}
          {/*            data={categoriesByMain} */}
          {/*            field={selectedParentCategoryId} */}
          {/*            onSelect={value => setSelectedParentCategoryId(value?.id)} */}
          {/*            option_title="name_fa" */}
          {/*          /> */}
          {/*        </FormControl> */}
          {/*      </FormItem> */}
          {/*    </div> */}
          {/*  )} */}
          {/* /> */}
          <FormField
            control={form.control}
            name="category_ids"
            render={() => (
              <div className="col-span-1 w-full gap-x-3">
                <FormItem>
                  <FormLabel>زیرشاخه</FormLabel>
                  <FormControl>
                    <FilterableComboBox
                      multiple={true}
                      field={selectedSubCategoryIds || bookCategoryIds}
                      data={subCategoriesByMain}
                      onSelect={values => setSelectedSubCategoryIds(values.map(v => v?.id))}
                      option_title="name_fa"
                    />
                  </FormControl>
                </FormItem>
              </div>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>توضیحات</FormLabel>
              <FormControl>
                <Textarea {...field} rows={5} className="h-[150px] pb-[100px] overflow-y-scroll" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center col-span-2">
          <Button disabled={mutateUpdateBook.isPending} className="w-[250px] justify-center" type="submit">
            {mutateUpdateBook.isPending && <Loader2 className="animate-spin" />}
            تایید
          </Button>
          {apiError && (
            <FormMessage>
              <span className="space-x-2">
                <span className="font-bold">خطای سرور :</span>
                <span className="text-xs">{apiError?.response?.data?.message}</span>
                <br />
                <span className="text-xs">{JSON.stringify(apiError?.response?.data?.errors)}</span>
              </span>
            </FormMessage>
          )}
        </div>
      </form>
    </Form>
  )
}
