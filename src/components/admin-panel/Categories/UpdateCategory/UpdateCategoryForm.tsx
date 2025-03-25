"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {z} from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
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
    settings: z.any(),
    description: z.any(),
    is_active: z.any(),
    tags: z.any(),
    poster_image: z.any(),
})
interface Category {
    id: number,
    name_fa: string,
    name_en: string,
    parent_id?: number | undefined,
    settings: Array<object> | null,
    description: string | undefined,
    is_active: number,
    tags: [],
    poster_image: File | string,
}

type UpdateCategoryFormProps = {
    closeDialog: () => void;
    category: Category;
}

export function UpdateCategoryForm({closeDialog, category}: UpdateCategoryFormProps) {
    const { updateCategory } = useAdminPanelRoutes();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentCategory, setCurrentCategory] = useState<Category>(category)
    const { updateStoreCategory } = useAdminStore()
    const [apiError, setApiError] = useState<Error | null>(null);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name_fa: currentCategory?.name_fa,
            name_en: currentCategory?.name_en,
            parent_id: currentCategory?.parent_id,
            settings: currentCategory?.settings && currentCategory?.settings[0]?.['icon_name'] || [{}],
            description: currentCategory?.description || '',
            is_active: 1,
            tags: currentCategory?.tags,
            poster_image: currentCategory?.poster_image || '',
        },
    })




    const mutateUpdateCategory = useMutation(
        {
            mutationFn: (data: Category) => updateCategory(
                data
                ),
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

    const handleIconSelect = (icon_name: string) => {
        console.log(`Selected icon: ${icon_name}`);
        form.setValue('settings', [{ icon_name: icon_name }])
    };

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const category_updateData: Category =
            data?.parent_id === null ?
                {
                    id: currentCategory?.id,
                    name_en: data?.['name_en'],
                    name_fa: data?.['name_fa'],
                    description: data?.['description'],
                    is_active: 1,
                    tags: currentCategory?.tags,
                    poster_image: currentCategory?.poster_image ,
                    settings: data?.['settings'],
                }
                :
                {
                    id: currentCategory?.id,
                    name_en: data?.['name_en'],
                    name_fa: data?.['name_fa'],
                    description: data?.['description'],
                    is_active: 1,
                    parent_id: data?.['parent_id'],
                    tags: currentCategory?.tags,
                    poster_image: currentCategory?.poster_image ,
                    settings: data?.['settings'],
                }
        mutateUpdateCategory.mutate(category_updateData)
        console.log("Form submitted:");
        console.log(JSON.stringify(data, null, 2))
    }

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
                <FormField
                        control={form.control}
                        name="settings"
                        render={() => (
                            <FormItem>
                                <FormLabel>نام آیکون</FormLabel>
                                <FormControl>
                                    <IconPicker defaultValue={category?.settings?.[0]?.['icon_name']}
                                                onValueChange={handleIconSelect}
                                                categorized={false}
                                                searchPlaceholder={'جستجوی نام آیکون'}
                                                triggerPlaceholder={'انتخاب آیکون...'}/>
                                </FormControl>
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
                                <Textarea {...field} rows={5} className={`h-[150px] pb-[100px] overflow-y-scroll`} />
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
