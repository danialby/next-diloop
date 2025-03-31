// adminStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelectors } from './selectors';

const useAdminStore = create<AdminStoreState>()(
    devtools((set, get) => ({
        selectedMainCategory: {
            id: 1,
            title: 'بیکار'
        },
        setSelectedMainCategory: (selectedMainCategory: MainCategory) =>
            set((state) => ({ ...state, selectedMainCategory })),

        selectedJoblessParent: null,
        selectedEmployeeParent: null,

        setSelectedJoblessParent: (item: object) =>
            set((state) => ({ ...state, selectedJoblessParent: item })),
        setSelectedEmployeeParent: (item: object) =>
            set((state) => ({ ...state, selectedEmployeeParent: item })),

        categories_data: [],
        loading: false,
        error: null,

        setCategoriesData: (categories_data: Category[]) =>
            set((state) => ({ ...state, categories_data })),

        updateStoreCategory: async (index: number, category: Category) => {
            set((state) => ({ ...state, loading: true, error: null }));
            try {
                set((state) => ({
                    ...state,
                    categories_data: state.categories_data.map((item) =>
                        item?.['id'] === index ? category : item
                    ),
                    loading: false
                }));
            } catch (err) {
                set((state) => ({
                    ...state,
                    error: err instanceof Error ? err.message : 'Unknown error',
                    loading: false
                }));
            }
        },

        addStoreCategory: async (category: Category) => {
            set((state) => ({ ...state, loading: true, error: null }));
            try {
                set((state) => ({
                    ...state,
                    categories_data: [...state.categories_data, category],
                    loading: false
                }));
            } catch (err) {
                set((state) => ({
                    ...state,
                    error: err instanceof Error ? err.message : 'Unknown error',
                    loading: false
                }));
            }
        },

        deleteStoreCategory: async (id: number) => {
            set((state) => ({ ...state, loading: true, error: null }));
            try {
                set((state) => ({
                    ...state,
                    categories_data: state.categories_data.filter((item) => item?.['id'] !== id),
                    loading: false
                }));
            } catch (err) {
                set((state) => ({
                    ...state,
                    error: err instanceof Error ? err.message : 'Unknown error',
                    loading: false
                }));
            }
        }
    }))
);

export default useAdminStore;