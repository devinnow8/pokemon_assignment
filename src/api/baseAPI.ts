import api from "./interceptor";
import { AxiosRequestConfig, AxiosResponse } from "axios";

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
