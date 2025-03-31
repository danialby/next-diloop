// selectors.ts
export const createSelectors = (state: AdminStoreState) => ({
    getJoblessParents: () =>
        state.categories_data.filter(item => item?.['parent_id'] === state.selectedJoblessParent),
    getEmployeeParents: () =>
        state.categories_data.filter(item => item?.['parent_id'] === state.selectedEmployeeParent),
    getCategoriesByParent: (parentId: number) =>
        state.categories_data.filter(item => item?.['parent_id'] === parentId)
});