// stores/adminStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
type MainCategory = {
    id: number;
    title: string;
}

interface AdminStoreState {
    selectedMainCategory: MainCategory;
    setSelectedMainCategory: (data: MainCategory) => void;
    categories_data: Array<object>;
    setCategoriesData: (data: Array<object>) => void;
    updateStoreCategory: (index: number, category: object) => void;
    addStoreCategory: (category: object) => void;
    deleteStoreCategory: (index: number) => void;
}

export const useAdminStore = create<AdminStoreState>()(
    devtools((set) => ({
    selectedMainCategory: {
        id: 1,
        title: 'بیکار'
    },
    setSelectedMainCategory: (selectedMainCategory: MainCategory) =>
        set(state => ({ ...state, selectedMainCategory })),

    categories_data: [],
    setCategoriesData: (categories_data: Array<object>) =>
        set(state => ({ ...state, categories_data })),

    updateStoreCategory: (index: number, category: object) =>
        set(state => ({
            ...state,
            categories_data: state.categories_data.map((item) =>
                item?.['id'] === index ? category : item
            )
        })),
    addStoreCategory: (category: object) => {
        set(state => ({
            ...state,
            categories_data: [...state.categories_data, category]
        }))
    },
    deleteStoreCategory: (id: number) =>
        set(state => ({
            ...state,
            categories_data: state.categories_data.filter((item) => item?.['id'] !== id)
        }))
})));

export default useAdminStore;
