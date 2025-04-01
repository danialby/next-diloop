// types.ts

export interface MainCategory {
  id: number
  title: string | undefined
}

export interface Category {
  id: number | undefined
  name_fa: string
  name_en: string
  parent_id?: number | null
  settings: Array<object> | null
  description: string | undefined
  is_active: number
  tags: [] | null
  poster_image: File | string
}

export interface AdminStoreState {
  selectedMainCategory: MainCategory
  setSelectedMainCategory: (selectedMainCategory: MainCategory) => void

  selectedParent: Category | null
  setSelectedParent: (item: Category | null) => void

  categories_data: Category[]
  loading: boolean
  error: string | null

  setCategoriesData: (categories_data: Category[]) => void
  updateStoreCategory: (index: number, category: Category) => Promise<void>
  addStoreCategory: (category: Category) => Promise<void>
  deleteStoreCategory: (id: number) => Promise<void>
}
