import axios from "axios";
import { getENVData } from "@/configs/enviornments";
import { isSuccessCode } from "@/utils/utilities";
import { viewer } from "@/configs/constants";
// import { setupInterceptorsTo } from "./interceptor";

/*   ___   __  __   ____     ___    ____    _____      _      _   _   _____
 *  |_ _| |  \/  | |  _ \   / _ \  |  _ \  |_   _|    / \    | \ | | |_   _|
 *   | |  | |\/| | | |_) | | | | | | |_) |   | |     / _ \   |  \| |   | |
 *   | |  | |  | | |  __/  | |_| | |  _ <    | |    / ___ \  | |\  |   | |
 *  |___| |_|  |_| |_|      \___/  |_| \_\   |_|   /_/   \_\ |_| \_|   |_|
 *  These functions are commonly used in components to make API calls..
 *  Please handle with care.
 */

// setupInterceptorsTo(axios)
// const keycloak: any = window.localStorage.getItem("keycloak_config");
let telco = viewer.toLowerCase();

export interface APIOptions {
  source: "meeting" | "chat" | "call" | "prov" | "keyCloak" | "default";
  skipTenant?: boolean;
  skipTelco?: boolean;
  skipHeader?: boolean;
  skipToken?: boolean;
}

export interface APIResponse {
  success: boolean;
  status: number;
  data: any;
  message?: any;
}

const baseURL = getENVData().baseURL;
const keyCloak = getENVData().keyCloak;
const buildUrl = (endpoint: string, options: APIOptions) => {
  var basePath = "";
  if (options.source === "keyCloak") {
    basePath = keyCloak;
  } else if (options?.source === "default") {
    basePath = baseURL;
    if (options?.skipTelco === false || options?.skipTelco === undefined) {
      basePath = `${basePath}telco/${telco}/`;
    }
  } else {
    basePath = baseURL + "srv/" + options.source + "/";
    if (options?.skipTelco === false || options?.skipTelco === undefined) {
      basePath = `${basePath}telco/${telco}/`;
    } else {
      basePath = `${basePath}`;
    }
  }
  if (options?.skipToken) {
    delete axios.defaults.headers.common["Authorization"];
  }
  return `${basePath}${endpoint}`;
};

/**
 * Retrieves data from a specified endpoint using an HTTP GET request.
 *
 * @param {string} endpoint - The endpoint to retrieve data from.
 * @param {APIOptions} options - Additional options for the API request (default is an empty object).
 * @return {Promise<any>} An object containing the success status, HTTP status code, and data retrieved.
 */
export async function get(
  endpoint: string,
  options: APIOptions
): Promise<APIResponse> {
  const { data, status } = await axios
    .get(buildUrl(endpoint, options))
    .then((response) => ({ data: response.data, status: response.status }))
    .catch((error) => ({ data: [], status: error.response?.status }));

  return { success: isSuccessCode(status), status, data };
}

/**
 * Sends a POST request to the specified endpoint with the given payload and options.
 *
 * @param {string} endpoint - the endpoint to send the POST request to
 * @param {any} payload - the data to be sent with the POST request
 * @param {APIOptions} options - optional configuration for the POST request
 * @return {Promise<any>} an object containing the success status, HTTP status, and response data
 */
export async function post(
  endpoint: string,
  payload: any,
  options: APIOptions,
  headers?: {}
): Promise<APIResponse> {
  const { data, status, message } = await axios
    .post(`${buildUrl(endpoint, options)}`, payload, headers)
    .then((response) => ({
      data: response.data,
      status: response.status,
      message: "",
    }))
    .catch((error) => ({
      data: [],
      status: error.response?.status,
      message: error.response.data.reason ?? "Something went wrong.",
    }));
  return { success: isSuccessCode(status), status, data, message };
}

/**
 * Asynchronously removes data from the specified endpoint using the provided payload and options.
 *
 * @param {string} endpoint - The endpoint to remove data from.
 * @param {any} payload - The data payload to be sent with the removal request.
 * @param {APIOptions} options - (Optional) Additional options for the API request.
 * @return {Promise<any>} An object containing the success status, response status, and data from the removal request.
 */
export async function remove(
  endpoint: string,
  payload: any = {},
  options: APIOptions
): Promise<APIResponse> {
  const { data, status } = await axios
    .delete(`${buildUrl(endpoint, options)}`, payload)
    .then((response) => ({ data: response.data, status: response.status }))
    .catch((error) => ({ data: [], status: error.response?.status }));

  return { success: isSuccessCode(status), status, data };
}

/**
 * Asynchronously sends a PUT request to the specified endpoint with the provided payload and options.
 *
 * @param {string} endpoint - the endpoint to send the request to
 * @param {any} payload - the data to be sent in the request
 * @param {APIOptions} options - (optional) additional options for the request
 * @return {Promise<any>} an object containing the success status, HTTP status code, and response data
 */
export async function put(
  endpoint: string,
  payload: any,
  options: APIOptions
): Promise<APIResponse> {
  const { data, status, message } = await axios
    .put(`${buildUrl(endpoint, options)}`, payload)
    .then((response) => ({
      data: response.data,
      status: response.status,
      message: "",
    }))
    .catch((error) => ({
      data: [],
      status: error.response?.status,
      message: error.response.data.reason ?? "Something went wrong.",
    }));

  return { success: isSuccessCode(status), status, data, message };
}
