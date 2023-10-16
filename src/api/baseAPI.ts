import api from "./interceptor";
import axios,{ AxiosRequestConfig, AxiosResponse } from "axios";

export const getRequest = async <T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return await api.get(endpoint, config);
};

export const postRequest = async <T>(
  endpoint: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return await api.post(endpoint, data, config);
};

export const putRequest = async <T>(
  endpoint: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return await api.put(endpoint, data, config);
};

export const deleteRequest = async <T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return await api.delete(endpoint, config);
};

export const getURLRequests = async <T>(
  endpoints: string[],
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>[]> => {
  const requests = endpoints.map((endpoint) => axios.get(endpoint, config));

  return await Promise.all(requests);
};
