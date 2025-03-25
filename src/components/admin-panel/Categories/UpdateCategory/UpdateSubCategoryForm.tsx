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
import React, {useMemo, useState} from "react";
import useAdminStore from "@/store/adminStore";
import {useAdminPanelRoutes} from "@/app/api/admin-panel/routes";
import {useMutation} from "@tanstack/react-query";
import {Loader2} from "lucide-react";
import {ParentsComboBox} from "@/components/admin-panel/Categories/ParentsComboBox";
import {ImageUploader} from "@/components/ui/image-uploader";



const FormSchema = z.object({
    name_fa: z.string().min(2, {
        message: "عنوان فارسی حداقل باید ۲ کاراکتر باشد",
    }),
    name_en: z.string().min(2, {
        message: "نام انگلیسی حداقل باید ۲ کاراکتر باشد",
    }),
    parent_id: z.any(),
    description: z.any(),
    is_active: z.any(),
    tags: z.any(),
    poster_image: z.any(),
})
interface Category {
    id: number,
    name_fa: string,
    name_en: string,
    parent_id: number | undefined,
    description: string | undefined,
    is_active: number,
    tags: [],
    poster_image: File | string,
}

type UpdateCategoryFormProps = {
    closeDialog: () => void;
    category: Category;
}

export function UpdateSubCategoryForm({closeDialog, category}: UpdateCategoryFormProps) {
    const { updateSubCategory } = useAdminPanelRoutes();
    const [currentCategory, setCurrentCategory] = useState<Category>(category)
    const { selectedMainCategory, categories_data, updateStoreCategory } = useAdminStore()
    const [apiError, setApiError] = useState<Error | null>(null);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name_fa: currentCategory?.name_fa,
            name_en: currentCategory?.name_en,
            parent_id: currentCategory?.parent_id,
            description: currentCategory?.description || '',
            is_active: 1,
            tags: currentCategory?.tags,
            poster_image: currentCategory?.poster_image || '',
        },
    })




    const mutateUpdateSubCategory = useMutation(
        {
            mutationFn: (data: Category) => updateSubCategory(
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
    const handleImageSelect = (image: File | string) => {
        console.log(`Selected image: ${image}`);
        setCurrentCategory(prevState => ({
            ...prevState, poster_image: image}))
        form.setValue('poster_image', image)
    };

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const category_updateSubData: Category =
                {
                    id: currentCategory?.id,
                    name_en: data?.['name_en'],
                    name_fa: data?.['name_fa'],
                    description: data?.['description'],
                    is_active: 1,
                    parent_id: data?.['parent_id'],
                    tags: currentCategory?.tags,
                    poster_image: currentCategory?.poster_image ,
                }
        mutateUpdateSubCategory.mutate(category_updateSubData)
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
                                            <ParentsComboBox data={JoblessParents} field={currentCategory?.parent_id} onSelect={(value) => form.setValue("parent_id", value?.id)}/>
                                        </FormControl>
                                    </FormItem>
                                }
                                {selectedMainCategory?.id === 2 &&
                                    <FormItem>
                                        <FormLabel>دسته بندی والد</FormLabel>
                                        <FormControl>
                                            <ParentsComboBox data={EmployeeParents} field={currentCategory?.parent_id} onSelect={(value) => form.setValue("parent_id", value?.id)}/>
                                        </FormControl>
                                    </FormItem>
                                }
                            </div>
                        )}
                    />
                }
                        <FormField
                            control={form.control}
                            name="poster_image"
                            render={({field}) => (
                                <FormItem className={`col-span-2`}>
                                    <FormLabel>تصویر</FormLabel>
                                    <FormControl >
                                        <ImageUploader image={field.value || currentCategory?.poster_image} onSelectImage={handleImageSelect} />
                                    </FormControl>
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
                    <Button disabled={mutateUpdateSubCategory.isPending} className={`w-[250px] justify-center`} type="submit">
                        {mutateUpdateSubCategory.isPending && <Loader2 className="animate-spin" />}
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
