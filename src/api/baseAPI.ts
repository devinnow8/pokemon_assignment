import api from "./interceptor";
import axios,{ AxiosRequestConfig, AxiosResponse } from "axios";

export const getRequest = async <T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return await api.get(endpoint, config);
};



export const getURLRequests = async <T>(
  endpoints: string[],
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>[]> => {
  const requests = endpoints.map((endpoint) => axios.get(endpoint, config));

  return await Promise.all(requests);
};
