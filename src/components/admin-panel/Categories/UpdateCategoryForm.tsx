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
import React, {useMemo} from "react";
import {ParentsComboBox} from "@/components/admin-panel/Categories/ParentsComboBox";
import useAdminStore from "@/store/adminStore";
import {useAdminPanelRoutes} from "@/app/api/admin-panel/routes";
import {useMutation} from "@tanstack/react-query";
import {Loader2} from "lucide-react";
import {NewParentsComboBox} from "@/components/admin-panel/Categories/NewParentsComboBox";



const FormSchema = z.object({
    name_fa: z.string().min(2, {
        message: "Name_fa must be at least 2 characters.",
    }),
    name_en: z.string().min(2, {
        message: "Name_en must be at least 2 characters.",
    }),
    parent_id: z.any(),
    icon_name: z.any(),
    description: z.any(),
    is_active: z.any(),
    tags: z.any(),
    poster_image: z.any(),
})



export function UpdateCategoryForm({category, closeDialog}) {
    const { updateCategory } = useAdminPanelRoutes();
    const { selectedMainCategory, categories_data, updateStoreCategory } = useAdminStore()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name_fa: category?.name_fa,
            name_en: category?.name_en,
            parent_id: category?.parent_id,
            icon_name: category?.icon_name,
            description: category?.description || '',
            is_active: 1,
            tags: [],
            poster_image: null,
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
                    tags: null,
                    poster_image:null
                }),
            onSuccess: (response ) => {
                // send code to number
                console.log(response)
                updateStoreCategory( category?.id,
                   response?.['data']?.category
                );
                closeDialog()
            },
            onError: (error) => {
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
                    render={({field}) => (
                        <div className={'col-span-2 w-full gap-x-3'}>
                            {selectedMainCategory?.id === 1 &&
                            <FormItem>
                                <FormLabel>دسته بندی والد</FormLabel>
                                <FormControl>
                                        <NewParentsComboBox data={JoblessParents} field={field} onSelect={(value) => form.setValue("parent_id", value)}/>
                                </FormControl>
                            </FormItem>
                                }
                            {selectedMainCategory?.id === 2 &&
                                <FormItem>
                                    <FormLabel>دسته بندی والد</FormLabel>
                                <FormControl>
                                        <NewParentsComboBox data={EmployeeParents} field={field} onSelect={(value) => form.setValue("parent_id", value)}/>
                                </FormControl>
                                </FormItem>
                            }
                        </div>
                    )}
                />
                }

                <FormField
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
                />
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
                </div>
            </form>
        </Form>
    )
}
