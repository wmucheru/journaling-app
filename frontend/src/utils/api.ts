import axios from "axios";

import { API_URL } from "@/utils/constants";
import LocalStore from "./localStorage";

const axiosOptions = {
  baseURL: API_URL,
  timeout: 20000,
};

type RequestObject = {
  type: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  params?: any | object;
  data?: object;
  headers?: object;
};

export const useAPI = async (options: RequestObject) => {
  const { type, url, params, data, headers } = options;

  const hookOptions: any = {
    ...axiosOptions,
    headers: {
      ...headers,
    },
  };

  // Add auth header to hook options
  if (!url.includes("?ref=site") && params?.ref !== "site") {
    const token = LocalStore.get("token");
    hookOptions.headers.authorization = `Bearer ${token}`;
  }

  const hookAxios = axios.create(hookOptions);

  let request;

  switch (type) {
    case "POST":
      request = hookAxios.post(url, data);
      break;

    case "PUT":
      request = hookAxios.put(url, data);
      break;

    case "PATCH":
      request = hookAxios.patch(url, data);
      break;

    case "DELETE":
      request = hookAxios.delete(url);
      break;

    case "GET":
    default:
      request = hookAxios.get(url, {
        params,
      });
      break;
  }

  return request;
};

/**
 *
 * https://github.com/axios/axios
 *
 */
export const customAxios = axios.create(axiosOptions);

export const get = (url: string, params = {}) => {
  return customAxios.get(url, {
    params,
  });
};

export const post = (url: string, data: object) => {
  return customAxios.post(url, data);
};

export const put = (url: string, data: object) => {
  return customAxios.put(url, data);
};

export const remove = (url: string) => {
  return customAxios.delete(url);
};

export default customAxios;
