import { useQuery } from '@tanstack/react-query';
import { getRecentScheduledAppointments } from '@/services/familyClinicService';
import { GetAppointmentRecordRequestsResponse } from '@/types/family_clinic/appointment_records';
import { useAuth } from '@/providers/AuthProvider';

/**
 * Hook to fetch the most recent scheduled appointment requests.
 * @param limit - Number of recent appointments to fetch (default is 5).
 * @returns Query object containing recent appointment requests.
 */
export const useRecentScheduledAppointments = (limit: number = 5) => {
    const { isAuthed } = useAuth();

    return useQuery<GetAppointmentRecordRequestsResponse>({
        queryKey: ['recentAppointments', limit],
        queryFn: () => getRecentScheduledAppointments(limit),
        enabled: isAuthed,
    });
};
