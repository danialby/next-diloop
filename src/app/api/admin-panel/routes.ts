import useAxios from "@/hooks/useAxios";

export function useAdminPanelRoutes() {

    const axiosInstance = useAxios()

    const getUsersList = async () => {
        return await axiosInstance.get('/admin/api/v1/users');
    }


    const getCategoriesList = async () => {
        return await axiosInstance.get('/admin/api/v1/skill-teach/category', {});
    }

    const addNewCategory = async ({name_en, name_fa, description, is_active, parent_id, tags, poster_image}) => {
        const formData = new FormData();
        formData.append('name_en', name_en);
        formData.append('name_fa', name_fa);
        formData.append('description', description);
        formData.append('is_active', is_active);
        formData.append('parent_id', parent_id);
        formData.append('tags[]', tags);

        if (poster_image) {
            // Ensure proper file handling
            const file = new File([poster_image], poster_image.name, {
                type: poster_image.type || 'image/png',
            });
            formData.append('poster_image', file);
        }

        return await axiosInstance.post(`/admin/api/v1/skill-teach/category`, formData, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'multipart/form-data', // Correct MIME type
            },
        });
    }

    const updateCategory = async ({id, name_en, name_fa, description, is_active, parent_id, tags, poster_image}) => {
        return await axiosInstance.put(`/admin/api/v1/skill-teach/category/${ id }`, {
            name_en, name_fa, description, is_active, parent_id, tags, poster_image
        });
    }

    const deleteCategory = async ({id}) => {
        return await axiosInstance._delete(`/admin/api/v1/skill-teach/category/${id}`, {
            id
        });
    }
    return { getUsersList, getCategoriesList, addNewCategory, updateCategory, deleteCategory }
}

