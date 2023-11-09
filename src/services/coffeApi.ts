import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_HOST_LEANDRO, VITE_HOST_KEVIN } = getEnvVariables();

// Creamos una función que devuelve la instancia de axios con el host deseado
const createAxiosInstance = (baseURL: string) => {
    const token = localStorage.getItem('token')
    const instance = axios.create({
        baseURL: `${baseURL}api`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    instance.interceptors.request.use((request) => {
        // const token = localStorage.getItem(`token`);
        // if (token) request.headers.set('token', token);
        return request;
    });

    return instance;
};

export const coffeApiLeandro = createAxiosInstance(VITE_HOST_LEANDRO);
export const coffeApiKevin = createAxiosInstance(VITE_HOST_KEVIN);
