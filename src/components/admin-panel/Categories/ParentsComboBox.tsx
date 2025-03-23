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
import {useState} from "react"

export function ParentsComboBox({ data, field, onSelect }) {
    const [open, setOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(data.filter(item => item?.id === field)[0])

    const handleSelect = (value: object) => {
        setSelectedValue(value)
        onSelect(value)
        setOpen(false)
    }

    return (
        <div className="flex flex-col md:flex-row gap-2 w-full">
            <Popover open={open}>
                <PopoverTrigger asChild onClick={() => setOpen(!open)}>
                    <FormControl>
                        <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "min-h-[40px] w-full",
                                "items-start",
                                "justify-between",
                                !selectedValue && "text-muted-foreground"
                            )}
                        >
                            {selectedValue ? (
                                <span>{selectedValue?.name_fa}</span>
                            ) : (
                                <span>انتخاب کنید...</span>
                            )}
                            <ChevronsUpDown className="opacity-50"/>
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0 font-vazir">
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
                                        value={item}
                                        onSelect={() => handleSelect(item)}
                                    >
                                        {item.name_fa}
                                        {selectedValue?.id === item.id && <Check className="ml-auto"/>}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
