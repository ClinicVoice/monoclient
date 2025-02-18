import { GetAppointmentRecordRequestsResponse } from '@/types/family_clinic/appointment_records';
import { getScheduledAppointmentsByDate } from '@/services/familyClinicService';
import { useQuery } from '@tanstack/react-query';

/**
 * Hook to fetch scheduled appointment requests for a given date.
 * @param date - The appointment date in ISO format (YYYY-MM-DD).
 * @returns Query object containing scheduled appointment requests.
 */
export const useScheduledAppointmentsByDate = (date: string) => {
    return useQuery<GetAppointmentRecordRequestsResponse>({
        queryKey: ['scheduledAppointments', date],
        queryFn: () => getScheduledAppointmentsByDate(date),
    });
};
