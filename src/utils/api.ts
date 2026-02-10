// api.ts
import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

export interface ApiClient extends AxiosInstance {}

const api: ApiClient = axios.create({
  baseURL: "http://localhost:8000/api/",
});
{/* Mise en place d'intercepteurs pour convertir le format des clés des données au format JSON entrantes et sortantes, la norme JS utilisant la camelCase et la norme Python utilisant le snake_case */}
{/* Conversion camelCase vers snake_case */}
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.data) {
    config.data = snakecaseKeys(config.data, { deep: true });
  }
  if (config.params) {
    config.params = snakecaseKeys(config.params, { deep: true });
  }
  return config;
});

{/* Conversion snake_case vers camelCase */}
api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data) {
      response.data = camelcaseKeys(response.data, { deep: true });
    }
    return response;
  },
  (error) => {
    if(error.response !== undefined) error.response.data = camelcaseKeys(error.response?.data || {}, { deep: true });
    return Promise.reject(error);
  }
);

export default api;
