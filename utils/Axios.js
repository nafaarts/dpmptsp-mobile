import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Axios = axios.create({
    baseURL: "https://4154-180-241-46-46.ngrok-free.app/api",
})

Axios.defaults.withCredentials = true

Axios.defaults.headers.common.Accept = 'application/json'
Axios.defaults.headers.common['Content-Type'] = 'application/json'
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

Axios.interceptors.request.use(
    async (config) => {
        const state = await AsyncStorage.getItem('auth-data')
        const { token } = JSON.parse(state).state;
        if (token) {
            config.headers.Authorization = `Bearer ss${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Axios.interceptors.response.use((response) => response,
//     (error) => {
//         return Promise.reject(error)
//     }
// )

export default Axios