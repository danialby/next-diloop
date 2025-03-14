import axios, {AxiosError} from "axios";
import {getAuthToken} from "@/store/authStore";
// import {ACTIONS} from '../constant/AuthAction';

const useAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
const getToken = () => {
    return getAuthToken();
};

useAxios.interceptors.request.use(
    (config) => {
            config.headers["Accept"] = "application/json"
            config.headers["Access-Control-Allow-Origin"] = "*"
            config.headers["authorization"] = 'Bearer '+getToken()

        if (config.headers["Content-Type"] === "multipart/form-data") {
            // Set the Content-Type header to multipart/form-data
            config.headers["Content-Type"] = "multipart/form-data";
        } else {
            config.headers["Content-Type"] = "application/json";
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    });

useAxios.interceptors.response.use(
    (response) => {
        if(response.data?.data?.result !== undefined && response.data?.data?.result === false) {
            throw new AxiosError(response.data?.message, response.data?.statusText, response.data?.data, response.request, response);
        }
        return response;
    },
    (error) => {
        if (error.response.status === 422){
            return Promise.reject(error)
        }
        if (error?.response?.status === 401) {
            if (error?.response?.config?.headers?.Range === "bytes=0-0") {

            } else {
                // decide remove forever in 401
                // dispatchUnauthenticatedUser();
            }
        }
        if (error.response.status === 403) {
            // toast("دسترسی غیرمجاز");
        }
        return Promise.reject(error);
    }
);
export default useAxios;
