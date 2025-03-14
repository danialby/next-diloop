"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
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
    FormControl,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

export interface ParentItem {
    id: string
    name_fa: string
}

export interface ParentsComboBoxProps {
    data: ParentItem[]
    field?: {
        value?: string[] // Changed to support multiple IDs
    }
    onSelect?: (values: string[]) => void
}

export function ParentsComboBox({ data, field, onSelect, category_id }) {
    const [open, setOpen] = useState(false)
    const [selectedValues, setSelectedValues] = useState(field.value || (category_id ? [category_id]: []))

    const handleSelect = (value: string) => {
        setSelectedValues(prev => {
            const exists = prev.includes(value)
            const newValues = exists
                ? prev.filter(v => v !== value)
                : [...prev, value]

            onSelect?.(newValues)
            return newValues
        })

        setOpen(false)
    }

    return (
        <div className={`flex flex-col md:flex-row gap-2 w-full`}>


            <Popover open={open}>
                <PopoverTrigger asChild onClick={() => setOpen(!open)}>
                    <FormControl className={`col-span-1`}>
                        <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "min-h-[40px] w-1/2",
                                "items-start",
                                "justify-between",
                                !field?.value?.length && "text-muted-foreground"
                            )}
                        >
                            {selectedValues?.length > 0 ? <span>{selectedValues?.length} مورد انتخاب شده </span> : <span>انتخاب کنید...</span> }
                                <ChevronsUpDown className="opacity-50"/>
                        </Button>
                    </FormControl>

                </PopoverTrigger>
                <PopoverContent className="p-0  font-vazir">
                    <Command>
                        <CommandInput
                            placeholder="جستجو..."
                            className="h-9"
                        />
                        <CommandList>
                            <CommandEmpty>نتیجه ای یافت نشد</CommandEmpty>
                            <CommandGroup>
                                {data.map((item) => (
                                    <CommandItem
                                        key={item.id}
                                        value={item.id}
                                        onSelect={() => handleSelect(item?.id)}
                                    >
                                        {item.name_fa}
                                        {selectedValues?.length > 0 && <Check
                                            className={cn(
                                                "ml-auto",
                                                selectedValues.includes(item.id)
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                        }
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <div className="flex flex-wrap gap-1">
                {selectedValues?.length > 0 && selectedValues.map((value, index) => {
                    const item = data.find(d => d.id === value)
                    return (
                        <span
                            key={`${value}-${index}`}
                            className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs flex items-center gap-1"
                        >
                                        {item?.name_fa}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleSelect(value)
                                }}
                                className="hover:bg-secondary-foreground hover:text-secondary rounded-full ml-1"
                            >
                                            ×
                                        </button>
                                    </span>
                    )
                })}
            </div>
        </div>
    )
}
