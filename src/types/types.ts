// types.ts

export interface MainCategory {
  id: number
  title: string | undefined
}

export interface Book {
  id?: number | undefined
  title_en: string
  title_fa: string
  description?: string | undefined
  is_active?: number
  is_free?: number
  tags?: Array<string | undefined>
  category_ids?: Array<number | undefined>
  poster_image?: File | string
  score?: number
}

export interface Category {
  id: number
  name_fa: string
  name_en: string
  parent_id?: number
  settings: Array<object> | null
  description: string | undefined
  is_active: number
  tags: [] | null
  poster_image: File | string
}

export interface BookResponse {
  id: number | undefined
  title_en: string
  title_fa: string
  description: string | undefined
  is_active: number
  is_free: number
  tags: string[] | null
  poster_image: string
  categories: Array<Category>
  score: number
  created_at: string
}

export interface AdminStoreState {
  selectedMainCategory: MainCategory
  setSelectedMainCategory: (selectedMainCategory: MainCategory) => void

  selectedParent: Category | null
  setSelectedParent: (item: Category | null) => void

  selectedSubCategory: Category | null
  setSelectedSubCategory: (item: Category | null) => void

  categories_data: Category[]
  loading: boolean
  error: string | null

  setCategoriesData: (categories_data: Category[]) => void
  updateStoreCategory: (index: number, category: Category) => Promise<void>
  addStoreCategory: (category: Category) => Promise<void>
  deleteStoreCategory: (id: number) => Promise<void>

  books_data: BookResponse[]
  setBooksData: (books_data: BookResponse[]) => void
  addStoreBook: (book: BookResponse) => Promise<void>
  updateStoreBook: (index: number, book: BookResponse) => Promise<void>
  deleteStoreBook: (id: number) => Promise<void>
}
