'use client';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAuth } from '@/providers/AuthProvider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ReactQueryProvider = ({ children }: any) => {
    const { clearAuth } = useAuth();
    const queryClient = new QueryClient({
        queryCache: new QueryCache({
            onError: (err) => {
                if (err instanceof AxiosError && err.response?.status === 401) {
                    clearAuth();
                }
            },
        }),
    });

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
