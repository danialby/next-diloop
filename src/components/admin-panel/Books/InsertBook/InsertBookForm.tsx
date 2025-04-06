'use client'
import type { Book, Category } from '@/types'
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
import { Loader2, Plus } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
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

interface InsertBookFormProps {
  closeDialog: () => void
  sub_category?: Category | undefined
}

export function InsertBookForm({ closeDialog, sub_category }: InsertBookFormProps) {
  const { addNewBook, getBooksList } = useAdminPanelRoutes()
  const { selectedMainCategory, setBooksData, categories_data } = useAdminStore()

  const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState<number[]>([])

  const [apiError, setApiError] = useState<Error | null>(null)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title_en: '',
      title_fa: '',
      category_ids: [],
      description: '',
      is_active: 1,
      is_free: 1,
      tags: [],
      poster_image: null,
      score: 0,
    },
  })

  const { mutate: getBooksMutation } = useMutation({
    mutationFn: () => getBooksList(),
    onSuccess: (response) => {
      // @ts-expect-error data in response
      setBooksData(response?.data?.books)
    },
  })

  const mutateNewBook = useMutation(
    {
      mutationFn: (data: Book) => addNewBook(
        {
          title_en: data?.title_en,
          title_fa: data?.title_fa,
          description: data?.description,
          is_active: 1,
          is_free: 1,
          tags: [selectedMainCategory?.title],
          category_ids: selectedSubCategoryIds?.length > 0 ? selectedSubCategoryIds : [sub_category?.id],
          poster_image: data?.poster_image || '',
          score: 0,
        },
      ),
      onSuccess: (response) => {
        // send code to number
        console.log(response)
        getBooksMutation()
        closeDialog()
      },
      onError: (error: Error) => {
        setApiError(error)
      },
    },
  )

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutateNewBook.mutate(data)
  }

  const subCategoriesByMain = useMemo(() => {
    return categories_data?.filter(item =>
    // @ts-expect-error tags can be null
      item?.tags?.includes(selectedMainCategory?.title) && item?.parent_id !== null,
    ) || []
  }, [categories_data, selectedMainCategory])

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
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
          name="poster_image"
          render={() => (
            <FormItem className="col-span-1">
              <FormLabel>تصویر</FormLabel>
              <FormControl>
                <ImageUploader onSelectImage={value => form.setValue('poster_image', value)} />
              </FormControl>
            </FormItem>
          )}
        />
        { sub_category
          ? (
              <div className="flex flex-col col-span-1 gap-2 disabled">
                {/* <FormField */}
                {/*  control={form.control} */}
                {/*  name="category_ids" */}
                {/*  render={() => ( */}
                {/*    <div className="col-span-1 w-full gap-x-3"> */}
                {/*      <FormItem> */}
                {/*        <FormLabel>دسته بندی والد</FormLabel> */}
                {/*        <FormControl> */}
                {/*          <FilterableComboBox data={categoriesByMain} field={selectedParentCategoryId} onSelect={value => setSelectedParentCategoryId(value?.id)} option_title="name_fa" /> */}
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
                            data={subCategoriesByMain}
                            field={[sub_category?.id]}
                            // ts-ignore
                            onSelect={values => setSelectedSubCategoryIds(values?.map(v => v))}
                            option_title="name_fa"
                          />
                        </FormControl>
                      </FormItem>
                    </div>
                  )}
                />
              </div>
            )
          : (
              <>
                {/* <FormField */}
                {/*  control={form.control} */}
                {/*  name="category_ids" */}
                {/*  render={() => ( */}
                {/*    <div className="col-span-1 w-full gap-x-3"> */}
                {/*      <FormItem> */}
                {/*        <FormLabel>دسته بندی والد</FormLabel> */}
                {/*        <FormControl> */}
                {/*          <FilterableComboBox data={categoriesByMain} field={selectedParentCategoryId} onSelect={value => setSelectedParentCategoryId(value?.id)} option_title="name_fa" /> */}
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
                            data={subCategoriesByMain}
                            onSelect={(values) => {
                              setSelectedSubCategoryIds(values.map(({ id }) => {
                                return id
                              }))
                            }}
                            option_title="name_fa"
                          />
                        </FormControl>
                      </FormItem>
                    </div>
                  )}
                />
              </>
            )}
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
        <div className="flex justify-center items-center col-span-2 gap-3">
          <Button
            disabled={mutateNewBook.isPending}
            onClick={() => closeDialog()}
            className="justify-center text-rose-500 hover:text-rose-500 hover:bg-rose-100 transition transition-[background]"
            type="button"
            variant="ghost"
          >
            لغو
          </Button>
          <Button
            disabled={mutateNewBook.isPending}
            className="justify-center  transition transition-[background]"
            type="submit"
          >
            {mutateNewBook.isPending && <Loader2 className="animate-spin" />}
            <Plus />
            افزودن کتاب
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
