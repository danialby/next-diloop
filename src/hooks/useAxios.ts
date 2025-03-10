import axiosInstance from '../lib/axiosInstance';

const useAxios = () => {
    const get = async <T>(url: string, config?: any): Promise<T> => {
        try {
            const response = await axiosInstance.get<T>(url, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const post = async <T>(url: string, data?: any, config?: any): Promise<T> => {
        try {
            const response = await axiosInstance.post<T>(url, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return { get, post };
};

export default useAxios;
