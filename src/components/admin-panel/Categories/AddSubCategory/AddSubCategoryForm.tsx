'use client'
import { useAdminPanelRoutes } from '@/app/api/admin-panel/routes'
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
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {Category} from "@/types";

const FormSchema = z.object({
  name_fa: z.string().min(2, {
    message: 'عنوان فارسی حداقل باید ۲ کاراکتر باشد',
  }),
  name_en: z.string().min(2, {
    message: 'نام انگلیسی حداقل باید ۲ کاراکتر باشد',
  }),
  parent_id: z.any(),
  icon_name: z.any(),
  description: z.any(),
  is_active: z.any(),
  tags: z.any(),
  poster_image: z.any(),
  settings: z.any(),
})

interface AddCategoryFormProps {
  closeDialog: () => void
  category?: Category | undefined
}

export function AddSubCategoryForm({ closeDialog, category }: AddCategoryFormProps) {
  const { addNewCategory } = useAdminPanelRoutes()
  const { addStoreCategory } = useAdminStore()
  const [apiError, setApiError] = useState<Error | null>(null)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name_fa: '',
      name_en: '',
      parent_id: category?.id,
      icon_name: '',
      description: '',
      settings: {},
      is_active: 1,
      tags: category?.tags,
      poster_image: null,
    },
  })

  const mutateNewCategory = useMutation(
    {
      mutationFn: (data: Category) => addNewCategory(
        {
          name_en: data?.name_en,
          name_fa: data?.name_fa,
          description: data?.description,
          is_active: 1,
          parent_id: data?.parent_id,
          tags: category?.tags,
          poster_image: data?.poster_image,
          settings: {},
        },
      ),
      onSuccess: (response) => {
        // send code to number
          addStoreCategory(
        // @ts-expect-error data inside response
            response?.data?.category,
        ).then(() => {
            closeDialog()
        })
      },
      onError: (error: Error) => {
        setApiError(error)
      },
    },
  )

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // @ts-expect-error data is category type
      mutateNewCategory.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full gap-x-3 grid grid-cols-2 space-y-4">
        <FormField
          control={form.control}
          name="name_fa"
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
          name="name_en"
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
            <FormItem className="col-span-2">
              <FormLabel>تصویر</FormLabel>
              <FormControl>
                <ImageUploader onSelectImage={value => form.setValue('poster_image', value)} />
              </FormControl>
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
        <div className="flex justify-center items-center col-span-2 flex-col gap-3">
          <Button disabled={mutateNewCategory.isPending} className="w-[250px] justify-center" type="submit">
            {mutateNewCategory.isPending && <Loader2 className="animate-spin" />}
            تایید
          </Button>
          {apiError && (
            <FormMessage>
              <span className="space-x-2">
                <span className="font-bold">خطای سرور :</span>
                <span className="text-xs">{apiError?.['response']?.data?.message}</span>
                <br />
                <span className="text-xs">{JSON.stringify(apiError?.['response']?.data?.errors)}</span>
              </span>
            </FormMessage>
          )}
        </div>
      </form>
    </Form>
  )
}
