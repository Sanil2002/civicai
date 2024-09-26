import React, { createContext, useEffect, useState } from "react";
import { Authv2 } from "./auth"
import { activityState } from "@/configs/constants";
// import Loader from "../loader";
// import Loginv2 from "./login";
import { Store } from "react-notifications-component";
// import { getPermissions, getPermissionsWithTenant } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
// import { setPermissionStatus, setPermissions, setToken } from "../../toolkit/reducers/permissionSlice";
import { setToken } from '@/redux/slices/auth/authSlice'
import { Route, Routes, useNavigate } from "react-router-dom";
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
// import PermissionChecker from "../../navigation/auth/PermissionChecker";
// import { setSimulation } from "../../toolkit/reducers/simulationSlice";
// import { setLogoDetails } from "../../toolkit/reducers/logoSlice";
import { getENVData } from "@/configs/enviornments";
import Login from "../login/login";
import { log } from "console";
// import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

export interface tryLoginOptions {
    username: string;
    password: string;
}

interface AuthContextType {
    isAuthenticated: string,
    tokens: any,
    accessToken: string,
    refreshToken: string,
    timeOut: number,
    generatedTime: Number,
    signIn: (token: any, onSignInComplete: Function) => void;
    checkClient: (skipPermission: boolean, onCheckClientComplete: Function) => void;
    signOut: (onSignOutComplete: Function) => void;
    syncCookie: (onSyncComplete: Function) => void;
    tryLogin: (options: tryLoginOptions, onLoginComplete: Function) => void;

}
export const AuthContext = createContext<AuthContextType>(null!);

export function AuthClient({ children }: { children: React.ReactNode }) {
    // const permissionStatus = useSelector((state: any) => state.Permissions.status);
    const token = useSelector((state: any) => state.auth.token);

    const [isAuthenticated, setIsAuthenticated] = React.useState<string>(activityState.LOADING);
    const [accessToken, setAccessToken] = React.useState<string>('');
    const [tokens, setTokens] = React.useState<any>({});
    const [refreshToken, setRefreshToken] = React.useState<string>('');
    const [timeOut, setTimeOut] = React.useState<number>(300000);
    const [generatedTime, setGeneratedTime] = React.useState<Number>(10000);
    
    let tryLogin = (options: tryLoginOptions, onSignInComplete: Function) => {
        setIsAuthenticated(activityState.WAIT);
        return Authv2.tryLogin(options, async (status: boolean, result: any) => {
            if (status) {
                setTokens(result);
                const data = jwtDecode(result.access_token)
                console.log("accesstoken", data);
                dispatch(setToken(data))
                setAccessToken(result.access_token)
                setAxios(result.access_token)
                setRefreshToken(result.refresh_token)
                setGeneratedTime(new Date().getTime());
                // await handlePermission()
                setIsAuthenticated(Authv2.isAuthenticated);
                onSignInComplete(Authv2.isAuthenticated);
                handleTokenCycle()
            } else {
                setIsAuthenticated(Authv2.isAuthenticated);
                Store.addNotification({
                    title: "Failed",
                    message: result,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: false,
                    },
                });
            }
        });
    };
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const handlePermission = async () => {
    //     setTimeout(async () => {
    //         let tenantData = sessionStorage.onSimulationTenant ? JSON.parse(sessionStorage.onSimulationTenant) : undefined
    //         let data: any
    //         if (tenantData?.uuid) {
    //             dispatch(setSimulation(tenantData))
    //             data = await getPermissionsWithTenant(tenantData.uuid)
    //         } else {
    //             data = await getPermissions()
    //         }
    //         dispatch(setPermissions(data.data));
    //         var flag = false;
    //         Object.keys(data?.data).map((node: any) => {
    //             if (data?.data[node].length > 0) {
    //                 flag = true
    //             }
    //         })
    //         // console.log("datadatadatadatadata",data)
    //         if (!flag) {
    //             dispatch(setPermissionStatus(403));
    //             sessionStorage.onSimulationTenant && sessionStorage.clear()
    //             navigate('portal/unautherized', { replace: true });
    //         } else {
    //             dispatch(setPermissionStatus(data?.status));
    //         }
    //     }, 100);
    // }
    let signIn = (token: any, onSignInComplete: Function) => {
        return Authv2.signIn(token, () => {
            setIsAuthenticated(activityState.SUCCESS);
            onSignInComplete(Authv2.isAuthenticated);
        });
    };
    let checkClient = (skipPermission: boolean = false, onCheckClientComplete: Function) => {
        setIsAuthenticated(activityState.SILENTCHECK);
        return Authv2.checkClient((result: any) => {
            if (result?.access_token) {
                setIsAuthenticated(Authv2.isAuthenticated);
                setTokens(Authv2.token);
                const data = jwtDecode(result.access_token)
                dispatch(setToken(data))
                setAxios(result.access_token)
                setAccessToken(result.access_token)
                setTimeOut((result.expires_in - 10) * 1000)
                setRefreshToken(result.refresh_token)
                setGeneratedTime(new Date().getTime());
                // if (!skipPermission && Authv2.isAuthenticated) {
                //     handlePermission()
                // }
                handleTokenCycle()
            } else {
                setIsAuthenticated(activityState.IDLE);
            }
            onCheckClientComplete(result.access_token);

        });
    }
    let syncCookie = (onCheckClientComplete: Function) => {
        return Authv2.syncCookie((result: any) => {
            setIsAuthenticated(Authv2.isAuthenticated);
            setTokens(Authv2.token);
            const data = jwtDecode(result.access_token)
            dispatch(setToken(data))
            setAccessToken(result.access_token)
            setAxios(result.access_token)
            setRefreshToken(result.refresh_token)
            onCheckClientComplete(Authv2.isAuthenticated);
        });
    }
    let signOut = (onSignOutComplete: Function) => {
        setIsAuthenticated(activityState.WAIT);
        return Authv2.signOut(refreshToken, () => {
            setTokens({});
            setIsAuthenticated(activityState.IDLE);
            // dispatch(setPermissionStatus(0));
            onSignOutComplete(Authv2.isAuthenticated);
            dispatch(setToken({}))
            setAccessToken('')
            setRefreshToken('')
            setGeneratedTime(0);
        });
    }
    let value = {
        isAuthenticated,
        tokens,
        accessToken,
        refreshToken,
        timeOut,
        generatedTime,
        signIn,
        checkClient,
        signOut,
        syncCookie,
        tryLogin
    };

    var timer: any






    useEffect(() => {
        checkClient(false, () => { })
    }, [])
    // const onStorageUpdate = (event: StorageEvent) => {
    //     syncCookie(() => { })
    // }
    const handleTokenCycle = () => {
        if (isAuthenticated === activityState.SILENTCHECK || isAuthenticated === activityState.SUCCESS) {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                checkClient(true, () => { })
            }, timeOut);
        }
    }
    // useEffect(() => {
    //     window.addEventListener("storage", onStorageUpdate);
    //     return () => {
    //         window.removeEventListener("storage", onStorageUpdate);
    //     };
    // }, []);
    const setAxios = (token: string) => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        // axios.defaults.headers.put["Authorization"] = "Bearer " + token;
        // axios.defaults.headers.delete["Authorization"] = "Bearer " + token;
        // axios.defaults.headers.get["Authorization"] = "Bearer " + token;
    }
    useEffect(() => {
        // console.log("isAuthenticated", isAuthenticated)
        if (isAuthenticated === activityState.SUCCESS || isAuthenticated === activityState.SILENTCHECK) {

        } else {
            axios.interceptors.request.clear();
            axios.interceptors.response.clear();
        }
    }, [isAuthenticated])

    return <AuthContext.Provider value={value}>
        {
            // permissionStatus === 200 && 
            // permissionStatus === 0 && 
            (isAuthenticated === activityState.SUCCESS || isAuthenticated === activityState.SILENTCHECK) ? children
                : isAuthenticated === activityState.LOADING || ((isAuthenticated === activityState.SUCCESS || isAuthenticated === activityState.SILENTCHECK)) ?
                <div className="h-screen w-screen flex justify-center items-center">
                    {/* <Loader /> */}
                    <div>Loading.....</div>
                </div>
                // : permissionStatus === 403 ? 
                // <PermissionChecker children={children} />
                :
                //  <Loginv2 />
                    // <div>
                    //     Login form
                    // </div>
                    <Login />
        }
    </AuthContext.Provider>;
}
export function useAuth() {
    return React.useContext(AuthContext);
}