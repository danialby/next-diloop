"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import {useState} from "react";
import {ParentsComboBox} from "@/components/admin-panel/ParentsComboBox";

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
]


export function UpdateCategoryForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(JSON.stringify(data, null, 2))
    }


    const [selectedPeople, setSelectedPeople] = useState([people[0], people[1]])
    const [query, setQuery] = useState('')

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full gap-x-3 grid grid-cols-2 space-y-6">
                <FormField
                    control={form.control}
                    name="name_fa"
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
                    name="name_en"
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
                <div className={'col-span-2 grid grid-cols-2 gap-x-3'}><ParentsComboBox />
                <div></div>
                </div>
                <FormField
                    control={form.control}
                    name="icon_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>نام آیکون</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription> با کلیک روی این لینک میتوانید لیست آیکون‌ها را ببینید و نام آیکون مورد نظر خود را اینجا وارد کنید</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem  className={`col-span-2`}>
                            <FormLabel>توضیحات</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormDescription>123</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className={`flex justify-center col-span-2`}>
                <Button className={`w-[250px] justify-center`} type="submit">تایید</Button>
                </div>
            </form>
        </Form>
    )
}
