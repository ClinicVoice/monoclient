import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/providers/AuthProvider';
import { useToaster } from '@/providers/ToasterProvider';
import { logoutUser } from '@/services/authenticationService';
import { AxiosError } from 'axios';

export const useLogout = () => {
    const queryClient = useQueryClient();
    const { clearAuth, getAccessToken, getRefreshToken } = useAuth();
    const { setToaster } = useToaster();

    return useMutation({
        mutationFn: async () => {
            const accessToken = getAccessToken();
            const refreshToken = getRefreshToken();
            if (!accessToken || !refreshToken) {
                throw new Error('Access token or refresh token not available');
            }
            return await logoutUser(accessToken, refreshToken);
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
            clearAuth();
            setToaster('Logged out successfully', 'success');
        },

        onError: (error: AxiosError) => {
            setToaster(error.message || 'Failed to log out', 'error');
        },
    });
};
