import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
} from "axios";

const  REACT_APP_BASE_URL  = "https://pokeapi.co/api/v2";
console.log("REACT_APP_BASE_URL",REACT_APP_BASE_URL)

const api: AxiosInstance = axios.create({
  baseURL: REACT_APP_BASE_URL,
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => Promise.reject(error)
);

export default api;
