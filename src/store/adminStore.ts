// adminStore.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {AdminStoreState, Category, MainCategory} from "@/types";

const useAdminStore = create<AdminStoreState>()(
  devtools(set => ({
    selectedMainCategory: {
      id: 1,
      title: 'بیکار',
    },
    setSelectedMainCategory: (selectedMainCategory: MainCategory) =>
      set(state => ({ ...state, selectedMainCategory })),

    selectedParent: null,
    setSelectedParent: (item: Category) =>
      set(state => ({ ...state, selectedParent: item })),

    categories_data: [],
    loading: false,
    error: null,

    setCategoriesData: (categories_data: Category[]) =>
      set(state => ({ ...state, categories_data })),

    updateStoreCategory: async (index: number, category: Category) => {
      set(state => ({ ...state, loading: true, error: null }))
      try {
        set(state => ({
          ...state,
          categories_data: state.categories_data.map(item =>
            item?.id === index ? category : item,
          ),
          loading: false,
        }))
      }
      catch (err) {
        set(state => ({
          ...state,
          error: err instanceof Error ? err.message : 'Unknown error',
          loading: false,
        }))
      }
    },

    addStoreCategory: async (category: Category) => {
      set(state => ({ ...state, loading: true, error: null }))
      try {
        set(state => ({
          ...state,
          categories_data: [...state.categories_data, category],
          loading: false,
        }))
      }
      catch (err) {
        set(state => ({
          ...state,
          error: err instanceof Error ? err.message : 'Unknown error',
          loading: false,
        }))
      }
    },

    deleteStoreCategory: async (id: number) => {
      set(state => ({ ...state, loading: true, error: null }))
      try {
        set(state => ({
          ...state,
          categories_data: state.categories_data.filter(item => item?.id !== id),
          loading: false,
        }))
      }
      catch (err) {
        set(state => ({
          ...state,
          error: err instanceof Error ? err.message : 'Unknown error',
          loading: false,
        }))
      }
    },
  })),
)

export default useAdminStore
