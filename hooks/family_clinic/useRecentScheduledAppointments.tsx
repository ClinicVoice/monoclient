import { GetAppointmentRecordRequestsResponse } from '@/types/family_clinic/appointment_records';
import { getRecentScheduledAppointments } from '@/services/familyClinicService';
import { useQuery } from '@tanstack/react-query';

/**
 * Hook to fetch the most recent scheduled appointment requests.
 * @param limit - Number of recent appointments to fetch (default is 5).
 * @returns Query object containing recent appointment requests.
 */
export const useRecentScheduledAppointments = (limit: number = 5) => {
    return useQuery<GetAppointmentRecordRequestsResponse>({
        queryKey: ['recentAppointments', limit],
        queryFn: () => getRecentScheduledAppointments(limit),
    });
};
