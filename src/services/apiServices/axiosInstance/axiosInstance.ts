import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { store, RootState } from "@/redux/store/store";
import { getENVData } from "@/configs/enviornments";

export const axiosInstance = axios.create({
  baseURL: getENVData().baseURL,
});

// Request interceptor to add the accessToken to the headers
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const state: RootState = store.getState(); // Get the current state
    const accessToken = state.auth.token; // Access the accessToken from the auth slice
    if (accessToken) {
      // Attach the accessToken to the Authorization header if it exists
      const headers: AxiosRequestHeaders = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      } as AxiosRequestHeaders;

      return {
        ...config,
        headers,
      };
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    // Handle the request error
    return Promise.reject(error);
  }
);

// Response interceptor to handle global responses
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Handle successful response
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    // Handle errors, e.g., token expiration, logging out, etc.
    if (error.response && error.response.status === 401) {
      // Perform any actions for unauthorized access, like redirecting to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
