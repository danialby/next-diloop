import useAxios from "@/hooks/useAxios";

export function useAdminPanelRoutes() {

    const axiosInstance = useAxios()

    const getUsersList = async () => {
        return await axiosInstance.get('/admin/api/v1/users');
    }


    const getCategoriesList = async () => {
        return await axiosInstance.get('/admin/api/v1/skill-teach/category', {});
    }

    const addNewCategory = async ({name_en, name_fa, description, is_active, parent_id, tags, poster_image, settings}) => {
        const addFormData = new FormData();
        addFormData.append('name_en', name_en);
        addFormData.append('name_fa', name_fa);
        addFormData.append('description', description);
        addFormData.append('is_active', is_active);
        addFormData.append('parent_id', parent_id);
        addFormData.append('tags[]', tags);
        addFormData.append('settings', JSON.stringify(settings));

        if (poster_image) {
            // Ensure proper file handling
            const file = new File([poster_image], poster_image.name, {
                type: poster_image.type || 'image/png',
            });
            addFormData.append('poster_image', file);
        }

        return await axiosInstance.post(`/admin/api/v1/skill-teach/category`, addFormData, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'multipart/form-data', // Correct MIME type
            },
        });
    }

    const updateCategory = async ({id, name_en, name_fa, description, is_active, tags, poster_image, settings}) => {
        const updateFormData = new FormData();
        updateFormData.append('name_en', name_en);
        updateFormData.append('name_fa', name_fa);
        updateFormData.append('description', description);
        updateFormData.append('is_active', is_active);
        updateFormData.append('tags[]', tags);
        updateFormData.append('_method', 'PUT');
        updateFormData.append('settings', JSON.stringify(settings));

        if (poster_image && poster_image instanceof File) {
            // Ensure proper file handling
            const file = new File([poster_image], poster_image.name, {
                type: poster_image.type || 'image/png',
            });
            updateFormData.append('poster_image', file);
        }
        return await axiosInstance.post(`/admin/api/v1/skill-teach/category/${ id }`, updateFormData, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'multipart/form-data', // Correct MIME type
            },
        });
    }

    const updateSubCategory = async ({id, name_en, name_fa, description, is_active, parent_id, tags, poster_image}) => {
        const updateSubFormData = new FormData();
        updateSubFormData.append('name_en', name_en);
        updateSubFormData.append('name_fa', name_fa);
        updateSubFormData.append('description', description);
        updateSubFormData.append('is_active', is_active);
        updateSubFormData.append('parent_id', parent_id);
        updateSubFormData.append('tags[]', tags);
        updateSubFormData.append('_method', 'PUT');

        if (poster_image && poster_image instanceof File) {
            // Ensure proper file handling
            const file = new File([poster_image], poster_image.name, {
                type: poster_image.type || 'image/png',
            });
            updateSubFormData.append('poster_image', file);
        }
        return await axiosInstance.post(`/admin/api/v1/skill-teach/category/${ id }`, updateSubFormData, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'multipart/form-data', // Correct MIME type
            },
        });
    }

    const deleteCategory = async ({id}) => {
        return await axiosInstance._delete(`/admin/api/v1/skill-teach/category/${id}`, {
            id
        });
    }
    return { getUsersList, getCategoriesList, addNewCategory, updateCategory, updateSubCategory, deleteCategory }
}

