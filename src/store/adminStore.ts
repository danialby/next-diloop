// stores/adminStore.ts
import { create } from 'zustand';

interface AdminStoreState {
    categories_data: Array<object>;
    setCategoriesData: (data: Array<object>) => void;
    updateStoreCategory: (index: number, category: object) => void;
    addStoreCategory: (category: object) => void;
    deleteCategory: (index: number) => void;
}

export const useAdminStore = create<AdminStoreState>()((set) => ({
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
}));

export default useAdminStore;
