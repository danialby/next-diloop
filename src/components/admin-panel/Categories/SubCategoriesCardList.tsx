// components/admin-panel/Categories/SubCategoriesCardList.tsx
import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, CalendarClock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toPersianDate, toPersianTime } from "@/utils/dateUtils";
import useSort from '@/hooks/useSort';
import ViewCategoryDialog from "@/components/admin-panel/Categories/ViewCategoryDialog";
import UpdateSubCategoryDialog from "@/components/admin-panel/Categories/UpdateCategory/UpdateSubCategoryDialog";
import DeleteCategoryDialog from "@/components/admin-panel/Categories/DeleteCategory/DeleteCategoryDialog";
import SearchInput from "@/components/common/SearchInput";
import CustomPagination from '@/components/ui/custom-pagination';

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

const ITEMS_PER_PAGE = 12; // Adjust based on your grid layout

const SubCategoriesCardList = ({ items = [] }: ListItemProps) => {
    const { sortConfig, requestSort, sortItems } = useSort<Item>();
    const [searchTerm, setSearchTerm] = useState('');
    const [showActiveOnly, setShowActiveOnly] = useState(false);
    const [selectedSubcategory, setSelectedSubCategory] = useState<Item | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const filterItems = useMemo(() => (
        items.filter(item => {
            const matchesSearch = !searchTerm ||
                item.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.name_fa.toLowerCase().includes(searchTerm.toLowerCase());

            return (!showActiveOnly || item.is_active) && matchesSearch;
        })
    ), [items, searchTerm, showActiveOnly]);

    const paginatedItems = useMemo(() => {
        const sortedItems = sortItems(filterItems, sortConfig.key, sortConfig.direction);
        return sortedItems.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
        );
    }, [filterItems, sortConfig.key, sortConfig.direction, currentPage]);

    const totalPages = Math.ceil(filterItems.length / ITEMS_PER_PAGE);



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
        <div dir="rtl" className="w-full max-w-7xl mx-auto">
            <div className="md:grid grid-cols-2 gap-4 justify-start items-center mb-6  !bg-blue-100 overflow-hidden">
                <SearchInput
                    placeholder={'جستجو در فصل ها...'}
                    onSearch={(value) => setSearchTerm(value)}
                    inputClasses={`rounded-none w-full border-none !bg-transparent  !shadow-none !border-b-1 !border-blue-500 focus-visible:!bg-blue-200`}
                />

                <div className="flex flex-wrap gap-4 justify-start items-center">
                    <SortableHeader key="name_en" label="نام" />
                    <SortableHeader key="created_at" label="تاریخ" />
                </div>
            </div>

            <div className="flex flex-wrap w-full md:gap-1.25 px-3">
                {paginatedItems.map((item) => (
                    <Card
                        key={item.id}
                        onClick={() => setSelectedSubCategory(item)}
                        className={`group relative p-0 rounded-md w-full cursor-pointer w-[12.5%] !h-[200px] justify-end bg-contain bg-no-repeat bg-[top_center] ${selectedSubcategory?.id === item?.id && 'ring-1 ring-rose-600'}`}
                        style={{ backgroundImage: `url(${item.poster_image || '/placeholder.jpg'})` }}
                    >
                        <Card className={`absolute gap-1 p-0 pb-2 rounded-md !w-full !h-full justify-end bg-transparent border-none !shadow-none overflow-hidden `}>
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
                                        <span><CalendarClock className={`size-4`} /></span>
                                        <span className={`flex flex-col text-left`}>
                                            <span>{toPersianDate(item.created_at)}</span>
                                            <span>{toPersianTime(item.created_at)}</span>
                                        </span>
                                    </span>
                                </p>
                            </CardContent>
                            <span className={`absolute z-0 leading-[0px] h-0 p-0 m-0 w-full shadow-[0px_0px_70px_50px_rgba(255,255,255,1)] md:shadow-[0px_0px_70px_90px_rgba(255,255,255,1)]`}> </span>
                            <div className={`flex flex-col gap-1 items-center justify-center absolute 
                                        transition transition-all 
                                        top-1.5 -left-10 origin-top-left scale-[0.7] opacity-0 
                                        lg:group-hover:opacity-100 lg:group-hover:left-1.5
                                        ${selectedSubcategory?.id === item?.id && '!opacity-100 !left-1.5'}`}>
                                <ViewCategoryDialog category={item} />
                                <UpdateSubCategoryDialog category={item} />
                                <DeleteCategoryDialog category={item} />
                            </div>
                        </Card>
                    </Card>
                ))}
            </div>

            <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default SubCategoriesCardList;