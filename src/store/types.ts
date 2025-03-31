// types.ts

type MainCategory = {
    id: number;
    title: string;
}
interface Category {
    id: number;
    title: string;
    parent_id?: number;
    [key: string]: any; // Allow additional properties
}

interface AdminStoreState {
    selectedMainCategory: MainCategory;
    setSelectedMainCategory: (data: MainCategory) => void;
    categories_data: Category[];
    selectedJoblessParent: object;
    selectedEmployeeParent: object;
    setCategoriesData: (data: Category[]) => void;
    updateStoreCategory: (index: number, category: Category) => void;
    addStoreCategory: (category: Category) => void;
    deleteStoreCategory: (id: number) => void;
    loading: boolean;
    error: string | null;
}