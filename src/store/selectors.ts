// selectors.ts
import type { AdminStoreState } from '@/types'

export function createSelectors(state: AdminStoreState) {
  return {
    getParents: () =>
      state.categories_data.filter(item => item === state.selectedParent),
    getCategoriesByParent: (parentId: number) =>
      state.categories_data.filter(item => item?.parent_id === parentId),
  }
}
