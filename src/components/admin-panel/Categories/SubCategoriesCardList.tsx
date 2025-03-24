// First, let's plan out what we need:
// 1. A component that takes a list of items and renders them with filters and sorts
// 2. We'll use ShadcN/UI components for a polished look:
//    - Card for each item
//    - Select for dropdowns
//    - Input for search
// 3. Need proper TypeScript interfaces for our data structure
// 4. Should handle RTL languages properly
// 5. Need default props for immediate usability

import { useState, useMemo } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import Image from "next/image";

// Now let's define our TypeScript interfaces:
// 1. Item interface matches the provided JSON structure
// 2. Props interface allows customization but provides defaults
// 3. Make sure all properties are optional except the ones we absolutely need

interface Item {
    id: number
    name_en: string
    name_fa: string
    is_active: boolean
    parent_id: number
    description?: string | null
    poster_image?: string
    created_by: number
    created_at: string
    updated_at: string
    updated_by: number
    tags: string[]
    settings?: Record<string, unknown> | null
}

interface ListItemProps {
    items?: Item[]
    defaultLanguage?: 'en' | 'fa'
    defaultSortBy?: 'name' | 'date'
    defaultOrderBy?: 'asc' | 'desc'
}

// Let's create helper functions for sorting and filtering:
// 1. Keep them outside the component to avoid recreating on each render
// 2. Make them type-safe
// 3. Handle edge cases gracefully

const sortByOptions = ['name', 'date'] as const
const orderOptions = ['asc', 'desc'] as const

const sortItems = (
    items: Item[],
    sortBy: typeof sortByOptions[number],
    orderBy: typeof orderOptions[number]
): Item[] => {
    return [...items].sort((a, b) => {
        const aValue = sortBy === 'name' ? a.name_en : new Date(a.created_at)
        const bValue = sortBy === 'name' ? b.name_en : new Date(b.created_at)

        if (orderBy === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
        }
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
    })
}

const filterItems = (
    items: Item[],
    searchTerm: string,
    activeOnly: boolean
): Item[] => {
    return items.filter(item => {
        const matchesSearch = !searchTerm ||
            item.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name_fa.toLowerCase().includes(searchTerm.toLowerCase())

        return (!activeOnly || item.is_active) && matchesSearch
    })
}

// Now let's create our main component:
// 1. Use ShadcN components for consistent styling
// 2. Implement responsive layout
// 3. Add proper accessibility attributes
// 4. Include helpful aria labels

const SubCategoriesCardList = ({
                      items = [],
                      defaultLanguage = 'en',
                      defaultSortBy = 'name',
                      defaultOrderBy = 'asc'
                  }: ListItemProps) => {
    const [sortBy, setSortBy] = useState<typeof defaultSortBy>(defaultSortBy)
    const [orderBy, setOrderBy] = useState<typeof defaultOrderBy>(defaultOrderBy)
    const [searchTerm, setSearchTerm] = useState('')
    const [showActiveOnly, setShowActiveOnly] = useState(false)

    const filteredSortedItems = useMemo(() => {
        let result = items

        result = filterItems(result, searchTerm, showActiveOnly)
        result = sortItems(result, sortBy, orderBy)

        return result
    }, [items, searchTerm, showActiveOnly, sortBy, orderBy])

    return (
        <div dir="rtl" className="space-y-4 w-full max-w-4xl mx-auto p-4">
            <div className="flex flex-wrap gap-4 justify-end items-center">
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="جستجو..."
                    className="w-[200px]"
                    aria-label="Search items"
                />

                <Select
                    value={sortBy}
                    onValueChange={(value: typeof sortByOptions[number]) => setSortBy(value)}
                >
                    <SelectTrigger className="w-[180px]" aria-label="Sort by">
                        <SelectValue placeholder="مرتب‌سازی بر اساس..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name">نام</SelectItem>
                        <SelectItem value="date">تاریخ</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={orderBy}
                    onValueChange={(value: typeof orderOptions[number]) => setOrderBy(value)}
                >
                    <SelectTrigger className="w-[120px]" aria-label="Order direction">
                        <SelectValue placeholder="ترتیب" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="asc">صعودی</SelectItem>
                        <SelectItem value="desc">نزولی</SelectItem>
                    </SelectContent>
                </Select>

                {/*<label className="flex items-center space-x-2">*/}
                {/*    <input*/}
                {/*        type="checkbox"*/}
                {/*        checked={showActiveOnly}*/}
                {/*        onChange={(e) => setShowActiveOnly(e.target.checked)}*/}
                {/*        className="rounded border-gray-300"*/}
                {/*    />*/}
                {/*    <span>فقط فعال‌ها</span>*/}
                {/*</label>*/}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSortedItems.map((item) => (
                    <Card key={item.id} className={`p-0`}>
                        <CardHeader>
                            <Image
                                src={item.poster_image || '/placeholder.jpg'}
                                alt={item[`name_${defaultLanguage}`]}
                                width="100" height="100"
                                className="w-full aspect-square object-cover rounded-t-lg"
                            />
                            <CardTitle className="mt-2">{item[`name_${defaultLanguage}`]}</CardTitle>
                            <CardDescription>
                                {item.tags.join(', ')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                تاریخ: {new Date(item.created_at).toLocaleDateString('fa-IR')}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default SubCategoriesCardList
