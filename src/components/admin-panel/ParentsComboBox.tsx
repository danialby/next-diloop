"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const languages = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Chinese", value: "zh" },
] as const


export function ParentsComboBox({data}) {

const form = useForm()
    return (
                <FormField
                    control={form.control}
                    name="دسته بندی والد"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>دسته بندی والد</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl className={`col-span-1`}>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? item.find(
                                                    (item) => item.value === field.value
                                                )?.label
                                                : ""}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder="جستجو..."
                                            className="h-9"
                                        />
                                        <CommandList>
                                            <CommandEmpty>نتیجه ای یافت نشد</CommandEmpty>
                                            <CommandGroup>
                                                {languages.map((item) => (
                                                    <CommandItem
                                                        value={item.label}
                                                        key={item.value}
                                                        onSelect={() => {
                                                            form.setValue("parent", item.value)
                                                        }}
                                                    >
                                                        {item.label}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                item.value === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                درصورت خالی گذاشتن، این دسته‌بندی به عنوان دسته‌بندی اصلی در نظر گرفته میشود. در غیر این صورت، دسته‌بندی والد را انتخاب کنید
                            </FormDescription>
                        </FormItem>
                    )}
                />
    )
}
