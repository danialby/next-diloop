import useAxios from "@/hooks/useAxios";


export function useApiRoutes() {
    const axiosInstance = useAxios()

    const Register = async (payload: object) => {
        return await axiosInstance.post('/api/v1/register', payload);
    }

    const Login = async ({mobile, method}) => {
        return await axiosInstance.post('/api/v1/login', {mobile, method});
    }

    const VerifyOtp = async ({mobile, otp, page}) => {
        return await axiosInstance.post('/api/v1/verify-otp', {mobile, otp, page});
    }

return { Register, Login, VerifyOtp };
}

