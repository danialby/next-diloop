import useAxios from "@/hooks/useAxios";

const axiosInstance = useAxios()

export async function Register(payload: object) {
    return await axiosInstance.post('/api/v1/register', payload);
}

export async function Login({mobile, method}) {
    return await axiosInstance.post('/api/v1/login', {mobile, method});
}

export async function VerifyOtp({mobile, otp, page}) {
    return await axiosInstance.post('/api/v1/verify-otp', {mobile, otp, page});
}
