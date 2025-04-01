// stores/globalStore.ts
import { create } from 'zustand'

// Define the type for the store state
interface GlobalStoreState {
  coursePageTitle: string
  courseTitle: string
  setCoursePageTitle: (title: string) => void
  setCourseTitle: (title: string) => void
}

// Create the store with TypeScript types
export const useGlobalStore = create<GlobalStoreState>(set => ({
  coursePageTitle: '',
  courseTitle: '',
  setCoursePageTitle: (coursePageTitle: string) => set(state => ({ ...state, coursePageTitle })),
  setCourseTitle: (courseTitle: string) => set(state => ({ ...state, courseTitle })),
}))

export default useGlobalStore
