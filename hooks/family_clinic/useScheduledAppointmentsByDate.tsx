import { useQuery } from '@tanstack/react-query';
import { getScheduledAppointmentsByDate } from '@/services/familyClinicService';
import { GetAppointmentRecordRequestsResponse } from '@/types/family_clinic/appointment_records';
import { useAuth } from '@/providers/AuthProvider';

/**
 * Hook to fetch scheduled appointment requests for a given date.
 * @param date - The appointment date in ISO format (YYYY-MM-DD).
 * @returns Query object containing scheduled appointment requests.
 */
export const useScheduledAppointmentsByDate = (date: string) => {
    const { isAuthed } = useAuth();

    return useQuery<GetAppointmentRecordRequestsResponse>({
        queryKey: ['scheduledAppointments', date],
        queryFn: () => getScheduledAppointmentsByDate(date),
        enabled: isAuthed && !!date,
    });
};
