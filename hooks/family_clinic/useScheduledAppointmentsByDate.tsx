import { useQuery } from '@tanstack/react-query';
import { getScheduledAppointmentsByDate } from '@/services/familyClinicService';
import { GetAppointmentRecordRequestsResponse } from '@/types/family_clinic/appointment_records';
import { useAuth } from '@/providers/AuthProvider';
import { AxiosError } from 'axios';

/**
 * Hook to fetch scheduled appointment requests for a given date.
 * @param date - The appointment date in ISO format (YYYY-MM-DD).
 * @returns Query object containing scheduled appointment requests.
 */
export const useScheduledAppointmentsByDate = (date: string) => {
    const { isAuthed, clearAuth } = useAuth();

    return useQuery<GetAppointmentRecordRequestsResponse>({
        queryKey: ['scheduledAppointments', date],
        queryFn: async () => {
            try {
                return await getScheduledAppointmentsByDate(date);
            } catch (error) {
                if (error instanceof AxiosError && error.response?.status === 401) {
                    clearAuth();
                }
                throw error;
            }
        },
        enabled: isAuthed && !!date,
    });
};
