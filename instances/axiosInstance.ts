import axios from 'axios';
import { clearTokens, getAccessToken } from '@/utils/tokenUtils';
import { BASE_URL, VERSION } from '@/config';

const axiosInstance = axios.create({
    baseURL: `${BASE_URL}/api/${VERSION}`,
    timeout: 5000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (!config.headers?.skipAuth && !config.headers?.Authorization) {
            const accessToken = getAccessToken();
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            clearTokens();
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
