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
        return await axiosInstance.post('/admin/api/v1/skill-teach/category', {
            name_en, name_fa, description, is_active, parent_id, tags, poster_image
        });
    }

    const updateNewCategory = async ({name_en, name_fa, description, is_active, parent_id, tags, poster_image}) => {
        return await axiosInstance.put('/admin/api/v1/skill-teach/category', {
            name_en, name_fa, description, is_active, parent_id, tags, poster_image
        });
    }

    const deleteNewCategory = async ({id}) => {
        return await axiosInstance._delete(`/admin/api/v1/skill-teach/category/${id}`, {
            id
        });
    }
    return { getUsersList, getCategoriesList, addNewCategory, updateNewCategory, deleteNewCategory }
}

