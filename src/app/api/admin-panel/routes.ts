import useAxios from "@/hooks/useAxios";

export function useAdminPanelRoutes() {
    const axiosInstance = useAxios()

    const getUsersList = async () => {
        return await axiosInstance.get('/admin/api/v1/users');
    }

    return { getUsersList }
}

