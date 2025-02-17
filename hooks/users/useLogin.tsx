import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/providers/AuthProvider';
import { LoginRequest } from '@/types/authentication';
import { loginUser } from '@/services/authenticationService';

export const useLogin = () => {
    const { setAccessToken, setRefreshToken } = useAuth();
    return useMutation({
        mutationFn: (data: LoginRequest) => {
            return loginUser(data);
        },
        onSuccess: (response) => {
            const { access_token: accessToken, refresh_token: refreshToken } = response;
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
        },
    });
};
