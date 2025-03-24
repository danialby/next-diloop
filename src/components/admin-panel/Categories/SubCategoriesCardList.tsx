// // First, let's plan out what we need:
// // 1. A component that takes a list of items and renders them with filters and sorts
// // 2. We'll use ShadcN/UI components for a polished look:
// //    - Card for each item
// //    - Select for dropdowns
// //    - Input for search
// // 3. Need proper TypeScript interfaces for our data structure
// // 4. Should handle RTL languages properly
// // 5. Need default props for immediate usability
//
// import { useState, useMemo } from 'react'
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle,
//     CardDescription
// } from '@/components/ui/card'
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
// import { Input } from '@/components/ui/input'
// import Image from "next/image";
//
// // Now let's define our TypeScript interfaces:
// // 1. Item interface matches the provided JSON structure
// // 2. Props interface allows customization but provides defaults
// // 3. Make sure all properties are optional except the ones we absolutely need
//
// interface Item {
//     id: number
//     name_en: string
//     name_fa: string
//     is_active: boolean
//     parent_id: number
//     description?: string | null
//     poster_image?: string
//     created_by: number
//     created_at: string
//     updated_at: string
//     updated_by: number
//     tags: string[]
//     settings?: Record<string, unknown> | null
// }
//
// interface ListItemProps {
//     items?: Item[]
//     defaultLanguage?: 'en' | 'fa'
//     defaultSortBy?: 'name' | 'date'
//     defaultOrderBy?: 'asc' | 'desc'
// }
//
// // Let's create helper functions for sorting and filtering:
// // 1. Keep them outside the component to avoid recreating on each render
// // 2. Make them type-safe
// // 3. Handle edge cases gracefully
//
// const sortByOptions = ['name', 'date'] as const
// const orderOptions = ['asc', 'desc'] as const
//
// const sortItems = (
//     items: Item[],
//     sortBy: typeof sortByOptions[number],
//     orderBy: typeof orderOptions[number]
// ): Item[] => {
//     return [...items].sort((a, b) => {
//         const aValue = sortBy === 'name' ? a.name_en : new Date(a.created_at)
//         const bValue = sortBy === 'name' ? b.name_en : new Date(b.created_at)
//
//         if (orderBy === 'asc') {
//             return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
//         }
//         return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
//     })
// }
//
// const filterItems = (
//     items: Item[],
//     searchTerm: string,
//     activeOnly: boolean
// ): Item[] => {
//     return items.filter(item => {
//         const matchesSearch = !searchTerm ||
//             item.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             item.name_fa.toLowerCase().includes(searchTerm.toLowerCase())
//
//         return (!activeOnly || item.is_active) && matchesSearch
//     })
// }
//
// // Now let's create our main component:
// // 1. Use ShadcN components for consistent styling
// // 2. Implement responsive layout
// // 3. Add proper accessibility attributes
// // 4. Include helpful aria labels
//
// const SubCategoriesCardList = ({
//                       items = [],
//                       defaultLanguage = 'en',
//                       defaultSortBy = 'name',
//                       defaultOrderBy = 'asc'
//                   }: ListItemProps) => {
//     const [sortBy, setSortBy] = useState<typeof defaultSortBy>(defaultSortBy)
//     const [orderBy, setOrderBy] = useState<typeof defaultOrderBy>(defaultOrderBy)
//     const [searchTerm, setSearchTerm] = useState('')
//     const [showActiveOnly, setShowActiveOnly] = useState(false)
//
//     const filteredSortedItems = useMemo(() => {
//         let result = items
//
//         result = filterItems(result, searchTerm, showActiveOnly)
//         result = sortItems(result, sortBy, orderBy)
//
//         return result
//     }, [items, searchTerm, showActiveOnly, sortBy, orderBy])
//
//     return (
//         <div dir="rtl" className="space-y-4 w-full max-w-4xl mx-auto p-4">
//             <div className="flex flex-wrap gap-4 justify-end items-center">
//                 <Input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder="جستجو..."
//                     className="w-[200px]"
//                     aria-label="Search items"
//                 />
//
//                 <Select
//                     value={sortBy}
//                     onValueChange={(value: typeof sortByOptions[number]) => setSortBy(value)}
//                 >
//                     <SelectTrigger className="w-[180px]" aria-label="Sort by">
//                         <SelectValue placeholder="مرتب‌سازی بر اساس..." />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectItem value="name">نام</SelectItem>
//                         <SelectItem value="date">تاریخ</SelectItem>
//                     </SelectContent>
//                 </Select>
//
//                 <Select
//                     value={orderBy}
//                     onValueChange={(value: typeof orderOptions[number]) => setOrderBy(value)}
//                 >
//                     <SelectTrigger className="w-[120px]" aria-label="Order direction">
//                         <SelectValue placeholder="ترتیب" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectItem value="asc">صعودی</SelectItem>
//                         <SelectItem value="desc">نزولی</SelectItem>
//                     </SelectContent>
//                 </Select>
//
//                 {/*<label className="flex items-center space-x-2">*/}
//                 {/*    <input*/}
//                 {/*        type="checkbox"*/}
//                 {/*        checked={showActiveOnly}*/}
//                 {/*        onChange={(e) => setShowActiveOnly(e.target.checked)}*/}
//                 {/*        className="rounded border-gray-300"*/}
//                 {/*    />*/}
//                 {/*    <span>فقط فعال‌ها</span>*/}
//                 {/*</label>*/}
//             </div>
//
//             <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                 {filteredSortedItems.map((item) => (
//                     <Card key={item.id} className={`pt-0 px-0`}>
//                         <CardHeader className={`px-0 text-xs`}>
//                             <Image
//                                 src={item.poster_image || '/placeholder.jpg'}
//                                 alt={item[`name_${defaultLanguage}`]}
//                                 width="100" height="100"
//                                 className="w-full aspect-square object-cover rounded-t-lg  shadow-lg"
//                             />
//                             <CardTitle className="mt-2 px-3">{item[`name_${defaultLanguage}`]}</CardTitle>
//                             <CardDescription className={`px-3`}>
//                                 {item.tags.join(', ')}
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             <p className="text-sm text-muted-foreground">
//                                 تاریخ: {new Date(item.created_at).toLocaleDateString('fa-IR')}
//                             </p>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>
//         </div>
//     )
// }
//
// export default SubCategoriesCardList
import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, CalendarClock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toPersianDate, toPersianTime } from "@/utils/dateUtils";
import useSort from '@/hooks/useSort';
import ViewCategoryDialog from "@/components/admin-panel/Categories/ViewCategoryDialog";
import UpdateSubCategoryDialog from "@/components/admin-panel/Categories/UpdateCategory/UpdateSubCategoryDialog";
import DeleteCategoryDialog from "@/components/admin-panel/Categories/DeleteCategory/DeleteCategoryDialog";

interface Item {
    id: number;
    name_en: string;
    name_fa: string;
    is_active: boolean;
    parent_id: number;
    description?: string | null;
    poster_image?: string;
    created_by: number;
    created_at: string;
    updated_at: string;
    updated_by: number;
    tags: string[];
    settings?: Record<string, unknown> | null;
}

interface ListItemProps {
    items?: Item[];
}

const SubCategoriesCardList = ({ items = [] }: ListItemProps) => {
    const { sortConfig, requestSort, sortItems } = useSort<Item>();
    const [searchTerm, setSearchTerm] = useState('');
    const [showActiveOnly, setShowActiveOnly] = useState(false);
    const [selectedSubcategory, setSelectedSubCategory] = useState<Item | null>(null)

    const filterItems = (
        items: Item[],
        searchTerm: string,
        activeOnly: boolean
    ): Item[] => {
        return items.filter(item => {
            const matchesSearch = !searchTerm ||
                item.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.name_fa.toLowerCase().includes(searchTerm.toLowerCase());

            return (!activeOnly || item.is_active) && matchesSearch;
        });
    };

    const filteredSortedItems = useMemo(() => {
        let result = items;

        result = filterItems(result, searchTerm, showActiveOnly);
        result = sortItems(result, sortConfig.key, sortConfig.direction);

        return result;
    }, [items, searchTerm, showActiveOnly, sortConfig.direction, sortConfig.key, sortItems]);

    const SortableHeader = ({ label, key }: { label: string; key: keyof Item }) => {
        const isActive = sortConfig.key === key;
        const isAsc = isActive && sortConfig.direction === 'asc';

        return (
            <div
                className="flex items-center justify-between p-2 cursor-pointer hover:bg-muted/50 rounded-md"
                onClick={() => requestSort(key)}
            >
                <span>{label}</span>
                {isActive ? (
                    isAsc ? (
                        <ArrowUp className="h-4 w-4 text-primary" />
                    ) : (
                        <ArrowDown className="h-4 w-4 text-primary" />
                    )
                ) : (
                    <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                )}
            </div>
        );
    };

    return (
        <div dir="rtl" className="space-y-4 w-full max-w-7xl mx-auto p-4">
            <div className="flex flex-wrap gap-4 justify-start items-center mb-6">
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="جستجو..."
                    className="w-[200px]"
                    aria-label="Search items"
                />

                <div className="flex flex-wrap gap-4 justify-center items-center">
                    <SortableHeader key="name_en" label="نام" />
                    <SortableHeader key="created_at" label="تاریخ" />
                </div>
            </div>

            <div className="flex flex-wrap w-full md:gap-0.5">
                {filteredSortedItems.map((item) => (
                    <Card key={item.id}
                          onClick={() => setSelectedSubCategory(item)}
                          className={`group relative p-0 rounded-md w-full cursor-pointer md:w-[48.5%]  xl:w-[32%] !h-[200px] justify-end bg-contain bg-no-repeat bg-[top_center] ${selectedSubcategory?.id === item?.id && '!border-rose-300'}`}
                          style={{backgroundImage: `url(${item.poster_image || '/placeholder.jpg'}`}}>
                        <Card
                            className={`absolute gap-1 p-0 pb-2 rounded-md !w-full !h-full justify-end bg-transparent border-none !shadow-none overflow-hidden `}>
                            <CardHeader className={`px-0 text-xs z-1`}>
                                <CardTitle className="mt-2 px-3">{item?.name_fa}</CardTitle>
                                <CardDescription className={`px-3`}>
                                <span className={`line-clamp-2 h-0 p-0 m-0 leading-0 `}>
                                    {item.description}
                                </span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className={`px-2 relative`}>
                                <p className="text-xs text-muted-foreground flex flex-col gap-1 relative z-1">
                                <span className={`flex justify-between items-center w-full`}>
                                    <span><CalendarClock className={`size-4`}/></span>
                                    <span>{toPersianTime(item.created_at) + ' - ' + toPersianDate(item.created_at)}</span>
                                </span>
                                </p>
                            </CardContent>
                            <span
                                className={`absolute z-0 leading-[0px] h-0 p-0 m-0 w-full shadow-[0px_0px_70px_50px_rgba(255,255,255,1)] md:shadow-[0px_0px_70px_90px_rgba(255,255,255,1)]`}> </span>
                            <div
                                className={`flex flex-col gap-1 items-center justify-center absolute 
                                            transition transition-all 
                                            top-1.5 -left-10 origin-top-left scale-[0.7] opacity-0 
                                            lg:group-hover:opacity-100 lg:group-hover:left-1.5
                                            ${selectedSubcategory?.id === item?.id && '!opacity-100 !left-1.5'}`}>
                                                    <ViewCategoryDialog category={item}/>
                                                    <UpdateSubCategoryDialog category={item}/>
                                                    <DeleteCategoryDialog category={item}/>
                            </div>
                        </Card>

                    </Card>
                ))}
            </div>
        </div>
    );
};

export default SubCategoriesCardList;
