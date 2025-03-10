import useAxios from "@/hooks/useAxios";

const axiosInstance = useAxios()

export async function getUsersList() {
    return await axiosInstance.get('/admin/api/v1/users');
}
