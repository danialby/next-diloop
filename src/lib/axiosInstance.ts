import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use environment variable
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to get the access token (e.g., from cookies)
const getAccessToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('accessToken'); // Client-side only
    }
    return null;
};

// Function to refresh the access token
const refreshAccessToken = async (): Promise<string> => {
    try {
        const response: AxiosResponse<{ accessToken: string }> = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh-token`,
            { refreshToken: localStorage.getItem('refreshToken') }
        );

        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken); // Store the new access token
        return accessToken;
    } catch (error) {
        console.error('Failed to refresh token:', error);
        localStorage.removeItem('accessToken'); // Clear invalid tokens
        localStorage.removeItem('refreshToken');
        throw error;
    }
};

// Request interceptor to attach the access token
axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an expired token (e.g., 401 status)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as retried

            try {
                const newAccessToken = await refreshAccessToken(); // Refresh the token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // Update the header
                return axiosInstance(originalRequest); // Retry the original request
            } catch (refreshError) {
                console.error('Unable to refresh token:', refreshError);
                // Redirect to login or handle token refresh failure
                window.location.href = '/login'; // Example: Redirect to login page
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
