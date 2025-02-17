import { LoginRequest, LoginResponse } from '@/types/authentication';
import axiosInstance from '@/instances/axiosInstance';

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post(`/authentication/login`, {
            email: data.email,
            password: data.password,
        });

        const { access_token, refresh_token, role } = response.data;

        return {
            access_token,
            refresh_token,
            role,
        };
    } catch (error) {
        throw new Error('Login failed');
    }
};

export const logoutUser = async (accessToken: string, refreshToken: string) => {
    try {
        const response = await axiosInstance.post('/authentication/logout', {
            access_token: accessToken,
            refresh_token: refreshToken,
        });

        return response.data;
    } catch (error) {
        throw new Error('Logout failed');
    }
};
