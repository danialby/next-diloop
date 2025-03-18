"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {z} from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea";
import React, {useMemo, useState} from "react";
import useAdminStore from "@/store/adminStore";
import {useAdminPanelRoutes} from "@/app/api/admin-panel/routes";
import {useMutation} from "@tanstack/react-query";
import {Loader2} from "lucide-react";
import {NewParentsComboBox} from "@/components/admin-panel/Categories/NewParentsComboBox";
import {ImageUploader} from "@/components/ui/image-uploader";



const FormSchema = z.object({
    name_fa: z.string().min(2, {
        message: "عنوان فارسی حداقل باید ۲ کاراکتر باشد",
    }),
    name_en: z.string().min(2, {
        message: "نام انگلیسی حداقل باید ۲ کاراکتر باشد",
    }),
    parent_id: z.any(),
    icon_name: z.any(),
    description: z.any(),
    is_active: z.any(),
    tags: z.any(),
    poster_image: z.any(),
})
interface category {
    id: number,
    name_fa: string,
    name_en: string,
    parent_id: number | undefined,
    icon_name: string | undefined,
    description: string | undefined,
    is_active: number,
    tags: [],
    poster_image: File | string,
}

type UpdateCategoryFormProps = {
    closeDialog: () => void;
    category?: category;
}

export function UpdateCategoryForm({closeDialog, category}: UpdateCategoryFormProps) {
    const { updateCategory } = useAdminPanelRoutes();
    const { selectedMainCategory, categories_data, updateStoreCategory } = useAdminStore()
    const [apiError, setApiError] = useState<Error | null>(null);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name_fa: category?.name_fa,
            name_en: category?.name_en,
            parent_id: category?.parent_id,
            icon_name: category?.icon_name,
            description: category?.description || '',
            is_active: 1,
            tags: category?.tags,
            poster_image: category?.poster_image || '',
        },
    })




    const mutateUpdateCategory = useMutation(
        {
            mutationFn: (data: object) => updateCategory(
                {
                    id: category?.id,
                    name_en:data?.['name_en'],
                    name_fa:data?.['name_fa'],
                    description:data?.['description'],
                    is_active: 1,
                    parent_id: data?.['parent_id'],
                    tags: category?.tags,
                    poster_image: category?.poster_image || data?.['poster_image']
                }),
            onSuccess: (response ) => {
                // send code to number
                console.log(response)
                updateStoreCategory( response?.['data']?.category?.id,
                   response?.['data']?.category
                );
                closeDialog()
            },
            onError: (error) => {
                setApiError(error)
                console.log(error)
            }
        })


    function onSubmit(data: z.infer<typeof FormSchema>) {
        mutateUpdateCategory.mutate(data)
        console.log("Form submitted:");
        console.log(JSON.stringify(data, null, 2))
    }

    const JoblessParents = useMemo(() => {
        return categories_data.filter(item => item?.['parent_id'] === null && item?.['tags']?.includes('بیکار'));
    }, [categories_data]);

    const EmployeeParents = useMemo(() => {
        return categories_data.filter(item => item?.['parent_id'] === null && item?.['tags']?.includes('شاغل'));
    }, [categories_data]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full gap-x-3 grid grid-cols-2 space-y-6">
                <FormField
                    control={form.control}
                    name="name_fa"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>عنوان فارسی</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name_en"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>نام انگلیسی</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                { category?.parent_id &&
                <FormField
                    control={form.control}
                    name="parent_id"
                    render={() => (
                        <div className={'col-span-2 w-full gap-x-3'}>
                            {selectedMainCategory?.id === 1 &&
                            <FormItem>
                                <FormLabel>دسته بندی والد</FormLabel>
                                <FormControl>
                                        <NewParentsComboBox data={JoblessParents} field={category?.parent_id} onSelect={(value) => form.setValue("parent_id", value?.id)}/>
                                </FormControl>
                            </FormItem>
                                }
                            {selectedMainCategory?.id === 2 &&
                                <FormItem>
                                    <FormLabel>دسته بندی والد</FormLabel>
                                <FormControl>
                                        <NewParentsComboBox data={EmployeeParents} field={category?.parent_id} onSelect={(value) => form.setValue("parent_id", value?.id)}/>
                                </FormControl>
                                </FormItem>
                            }
                        </div>
                    )}
                />
                }
                { category?.parent_id ?
                    (
                        <FormField
                            control={form.control}
                            name="poster_image"
                            render={() => (
                                <FormItem className={`col-span-2 pointer-events-none`}>
                                    <FormLabel>تصویر</FormLabel>
                                    <FormControl >
                                        <ImageUploader image={category?.poster_image} onSelectImage={(value) => form.setValue("poster_image", value)} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    )

                    :
                    ( <FormField
                        control={form.control}
                        name="icon_name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>نام آیکون</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription> با کلیک روی این لینک میتوانید لیست آیکون‌ها را ببینید و نام آیکون مورد نظر
                                    خود را اینجا وارد کنید</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    /> )
                }
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem className={`col-span-2`}>
                            <FormLabel>توضیحات</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className={`flex justify-center col-span-2`}>
                    <Button disabled={mutateUpdateCategory.isPending} className={`w-[250px] justify-center`} type="submit">
                        {mutateUpdateCategory.isPending && <Loader2 className="animate-spin" />}
                        تایید</Button>
                    {apiError && <FormMessage>
                        <span className={`space-x-2`}>
                            <span className={`font-bold`}>خطای سرور :</span>
                            <span className={`text-xs`}>{apiError?.['response']?.data?.message}</span><br/>
                            <span className={`text-xs`}>{JSON.stringify(apiError?.['response']?.data?.errors)}</span>
                        </span>
                    </FormMessage>
                    }
                </div>
            </form>
        </Form>
    )
}
