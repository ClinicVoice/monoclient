import { useQuery } from '@tanstack/react-query';
import { getRecentTestResultsRequests } from '@/services/familyClinicService';
import { GetRecentTestResultsRequestsResponse } from '@/types/family_clinic/test_results_requests';
import { useAuth } from '@/providers/AuthProvider';
import { AxiosError } from 'axios';

/**
 * Hook to fetch the most recent test results requests.
 * @param limit - Number of recent test results requests to fetch (default is 5).
 * @returns Query object containing recent test results requests.
 */
export const useRecentTestResultsRequests = (limit: number = 5) => {
    const { isAuthed, clearAuth } = useAuth();

    return useQuery<GetRecentTestResultsRequestsResponse>({
        queryKey: ['recentTestResultsRequests', limit],
        queryFn: () => {
            try {
                return getRecentTestResultsRequests(limit);
            } catch (error) {
                if (error instanceof AxiosError && error.response?.status === 401) {
                    clearAuth();
                }
                throw error;
            }
        },
        enabled: isAuthed,
    });
};
