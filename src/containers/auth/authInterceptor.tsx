import axios, { Axios, AxiosHeaders, AxiosRequestConfig, AxiosResponse } from "axios"
import { useAuth } from "./authClient";
import { useEffect } from "react";
import { activityState } from "@/configs/constants";
import { rejects } from "assert";
import { config } from "process";

const AuthInterceptor = (props: any) => {

    var APIConfig: any
    var duplicateCheck: any
    const auth = useAuth();

    const onResponse = (response: AxiosResponse): AxiosResponse => {
        return response;
    }
    const onResponseError = async (error: any) => {
        if (error.response?.status === 401 && duplicateCheck !== APIConfig.url) {
            return await new Promise((resolve, reject) => {
                auth.checkClient(true, async (accessToken: any) => {
                    duplicateCheck = APIConfig.url
                    APIConfig.headers['Authorization'] = `Bearer ${accessToken}`;
                    resolve(axios.request(APIConfig))
                })
            });
        } else {
            return Promise.reject(error);
        }
    }
    useEffect(() => {
        axios.interceptors.request.use(
            config => {
                if (!config.url?.includes('/protocol/openid-connect/token')) {
                    APIConfig = config
                    if (duplicateCheck !== APIConfig.url) {
                        duplicateCheck = ''
                    }
                }
                return config
            }
        )
        axios.interceptors.response.use(
            response => onResponse(response),
            error => onResponseError(error)
        )
    }, [])
    return <>
        {props.children}
    </>
}
export default AuthInterceptor