import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_HOST_LEANDRO, VITE_HOST_KEVIN } = getEnvVariables();

// Creamos una función que devuelve la instancia de axios con el host deseado
const createAxiosInstance = (baseURL: string) => {
    const instance = axios.create({
        baseURL: `${baseURL}/api`
    });

    instance.interceptors.request.use(config => {
        const token = localStorage.getItem(`token`);
        if (token) {
            config.headers = {
                ...config.headers,
                // 'Authorization': `Bearer ${token}`,
            };
        }
        return config;
    });

    return instance;
};

export const coffeApiLeandro = createAxiosInstance(VITE_HOST_LEANDRO);
export const coffeApiKevin = createAxiosInstance(VITE_HOST_KEVIN);
