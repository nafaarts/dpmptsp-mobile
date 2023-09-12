import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router';

const BASE_URL = "https://dpmptsp.deply.site";

const Axios = axios.create({
    baseURL: BASE_URL + '/api',
})

// header
Axios.defaults.headers.common.Accept = 'application/json'

Axios.interceptors.request.use(
    async (config) => {
        const state = await AsyncStorage.getItem('auth-data')
        const { token } = JSON.parse(state).state;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

Axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.request && error.request.status === 401) {
        router.replace('/logout');
      }
      throw error;
    },
  );

export default Axios
export { BASE_URL }