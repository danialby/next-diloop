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
import React, {useState} from "react";
import useAdminStore from "@/store/adminStore";
import {useAdminPanelRoutes} from "@/app/api/admin-panel/routes";
import {useMutation} from "@tanstack/react-query";
import {Loader2} from "lucide-react";
import {IconPicker} from "@/components/ui/icon-picker";



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
    settings: z.any()
})



export function NewCategoryForm({closeDialog}) {
    const { addNewCategory } = useAdminPanelRoutes();
    const { selectedMainCategory, addStoreCategory } = useAdminStore()
    const [apiError, setApiError] = useState<Error | null>(null);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name_fa: '',
            name_en: '',
            parent_id: '',
            settings: [{}],
            icon_name: '',
            description: '',
            is_active: 1,
            tags: null,
            poster_image: null,
        },
    })




    const mutateNewCategory = useMutation(
        {
            mutationFn: (data: object) => addNewCategory(
                {
                    name_en:data?.['name_en'],
                    name_fa:data?.['name_fa'],
                    description:data?.['description'],
                    is_active: 1,
                    settings: data?.['settings'] || [{}],
                    parent_id: data?.['parent_id'],
                    tags: selectedMainCategory?.id === 1 ? ['بیکار'] : ['شاغل'],
                    poster_image:null
                }),
            onSuccess: (response ) => {
                // send code to number
                console.log(response)
                addStoreCategory(
                    response?.['data']?.category
                );
                closeDialog()
            },
            onError: (error) => {
                console.log(error)
                setApiError(error)
            }
        })


    function onSubmit(data: z.infer<typeof FormSchema>) {
        mutateNewCategory.mutate(data)
        console.log("Form submitted:");
        console.log(JSON.stringify(data, null, 2))
    }

    const handleIconSelect = (icon_name: string) => {
        console.log(`Selected icon: ${icon_name}`);
        form.setValue('settings', [{ icon_name: icon_name }])
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full gap-x-3 grid grid-cols-2 space-y-4">
                <FormField
                    control={form.control}
                    name="name_fa"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>عنوان فارسی</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage className={`text-xs`} />
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
                            <FormMessage className={`text-xs`} />
                        </FormItem>
                    )}
                />
                {/*<FormField*/}
                {/*    control={form.control}*/}
                {/*    name="parent_id"*/}
                {/*    render={({field}) => (*/}
                {/*        <div className={'col-span-2 w-full gap-x-3'}>*/}
                {/*            <FormItem>*/}
                {/*                <FormLabel>دسته بندی والد</FormLabel>*/}
                {/*                <FormControl>*/}

                {/*                    <ParentsComboBox data={parents} field={field} category_id={null}*/}
                {/*                                     onSelect={handleParentSelection}/>*/}

                {/*                </FormControl>*/}
                {/*                <FormDescription>*/}
                {/*                    درصورت خالی گذاشتن، این دسته‌بندی به عنوان دسته‌بندی اصلی در نظر گرفته میشود. در غیر این صورت، دسته‌بندی والد را انتخاب کنید*/}
                {/*                </FormDescription>*/}
                {/*            </FormItem>*/}
                {/*        </div>*/}
                {/*    )}*/}
                {/*/>*/}

                <FormField
                    control={form.control}
                    name="icon_name"
                    render={({}) => (
                        <FormItem className={`col-span-1`}>
                            <FormLabel>نام آیکون</FormLabel>
                            <FormControl>
                            <IconPicker
                                searchPlaceholder={'جستجوی نام آیکون'}
                                triggerPlaceholder={'انتخاب آیکون...'}
                                onValueChange={handleIconSelect}
                                categorized={false}/>
                            </FormControl>
                            <FormMessage className={`text-xs`} />
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
                                <Textarea {...field} rows={5} className={`h-[150px] pb-[100px] overflow-y-scroll`} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className={`flex justify-center items-center col-span-2 flex-col gap-3`}>
                    <Button disabled={mutateNewCategory.isPending} className={`w-[250px] justify-center`} type="submit">
                        {mutateNewCategory.isPending && <Loader2 className="animate-spin" />}
                        تایید</Button>
                    {apiError && <FormMessage>
                        <div className={`space-x-2`}>
                            <span className={`font-bold`}>خطای سرور :</span>
                            <span className={`text-xs`}>{apiError?.['response']?.data.message}</span><br/>
                            <span className={`text-xs`}>{JSON.stringify(apiError?.['response']?.data.errors)}</span>
                        </div>
                    </FormMessage>
                    }
                </div>
            </form>
        </Form>
    )
}
