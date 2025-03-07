import { ApiService } from '@/lib/services/api';
import {NextResponse} from "next/server";

export async function Register(payload: object) {
    const apiService = new ApiService();
    const _register = await apiService.post('/api/v1/register', payload);
    return NextResponse.json(_register);
}

export async function Login({mobile, method}) {
    const apiService = new ApiService();
    const _login = await apiService.post('/api/v1/login', { mobile, method });
    return NextResponse.json(_login);
}

export async function VerifyOtp({mobile, otp, page}) {
    const apiService = new ApiService();
    const _verifyOtp = await apiService.post('/api/v1/verify-otp', {mobile, otp, page});
    return NextResponse.json(_verifyOtp);
}
