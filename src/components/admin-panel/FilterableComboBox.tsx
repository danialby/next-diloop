'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  FormControl,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { useState } from 'react'

interface FilterableComboBoxProps {
  //ts-ignore
  data: Array<never | any>
  field?: number | number[] | undefined
  onSelect: (value: never | never[] | undefined) => void
  option_title: string
  multiple?: boolean
  placeholder?: string
}

export function FilterableComboBox({
  data,
  field,
  onSelect,
  option_title,
  multiple = false,
  placeholder = 'انتخاب کنید...',
}: FilterableComboBoxProps) {
  const [open, setOpen] = useState(false)

  // Initialize selected values based on field prop
  const initialSelectedValues = multiple
    ? data.filter(item => Array.isArray(field) && field.includes(item?.id))
    : data.filter(item => item?.id === field)

  const [selectedValues, setSelectedValues] = useState(initialSelectedValues)

  const handleSelect = (value: never) => {
    if (multiple) {
      // @ts-ignore
      const isSelected = selectedValues.some(item => item?.id === value?.id)
      let newSelectedValues: never[]

      if (isSelected) {
        // Remove if already selected
        // @ts-ignore
        newSelectedValues = selectedValues.filter(item => item?.id !== value?.id)
      }
      else {
        // Add if not selected
        // @ts-ignore
        newSelectedValues = [...selectedValues, value]
      }

      setSelectedValues(newSelectedValues)
      onSelect(newSelectedValues)
    }
    else {
      // Single select mode
      setSelectedValues([value])
      onSelect(value)
      setOpen(false)
    }
  }

  const removeChip = (id: number) => {
    const newSelectedValues = selectedValues.filter(item => item?.id !== id)
    setSelectedValues(newSelectedValues)
    // @ts-ignore
    onSelect(newSelectedValues)
  }

  const displayButtonText = () => {
    if (selectedValues.length === 0) {
      return <span>{placeholder}</span>
    }

    if (multiple) {
      return (
        <span>
          {selectedValues.length}
          {' '}
          مورد انتخاب شده
        </span>
      )
    }

    return <span>{selectedValues[0]?.[option_title]}</span>
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Selected chips container */}
      {multiple && selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedValues.map(item => (
            <div
              key={item.id}
              className="inline-flex items-center px-1 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
            >
              {item[option_title]}
              <Button
                size="icon"
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeChip(item.id)
                }}
                className="p-0.5 mr-1 rounded-full hover:bg-primary/20 size-4"
              >
                <X className="!h-3 !w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                'min-h-[40px] w-full',
                'items-start',
                'justify-between',
                selectedValues.length === 0 && 'text-muted-foreground',
              )}
            >
              {displayButtonText()}
              <ChevronsUpDown className="opacity-50" />
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
                {data.map(item => (
                  <CommandItem
                    key={item.id}
                    value={item?.[option_title]}
                    onSelect={() => handleSelect(item)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedValues.some(v => v?.id === item.id) ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {item?.[option_title]}
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
