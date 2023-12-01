import axios from 'axios';
import { getEnvVariables } from '../helpers';
import { jwtDecode } from 'jwt-decode'

const { VITE_HOST_BACKEND } = getEnvVariables();

let isUserActive = false

const setUserActive = () => {
  isUserActive = true;
  setTimeout(() => {
    isUserActive = false
  }, 5000)
}

document.addEventListener('mousemove', setUserActive)
document.addEventListener('keypress', setUserActive)

// Creamos una función que devuelve la instancia de axios con el host deseado
const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL: `${baseURL}api`,
  });

  const verifyToken = () => {
    return setInterval(() => {
      if (!isUserActive) {
        const token = localStorage.getItem(`token`);
        if (token != null && token != undefined) {
          const decoded = jwtDecode(token)
          if (isTokenExpired(decoded.exp)) {
            console.log("token expirado")
            localStorage.clear()
            window.location.href = '/'
          }
        }
      }
    }, 30000)
  }

  instance.interceptors.request.use((request) => {
    const token = localStorage.getItem(`token`);
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
      let intervalId = verifyToken()
      setTimeout(() => {
        clearInterval(intervalId)
        intervalId = verifyToken()
      }, 30000)
    }
    return request;
  }, (error) => {
    return Promise.reject(error)
  });

  return instance;
};

const isTokenExpired = (expirationDate: any) => {
  const now = new Date().getTime() // ahora
  expirationDate *= 1000
  console.log(expirationDate)
  return now > expirationDate
}

export const coffeApi = createAxiosInstance(VITE_HOST_BACKEND);
