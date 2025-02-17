import { useQuery } from '@tanstack/react-query';
import { getAvailableAppointmentSlots } from '@/services/familyClinicService';
import { GetAvailableAppointmentSlotsRequest } from '@/types/family_clinic/appointment_records';

export const useAvailableAppointmentSlots = (date: string, duration_limit: number = 30) => {
    return useQuery<GetAvailableAppointmentSlotsRequest>({
        queryKey: ['availableAppointments', date, duration_limit],
        queryFn: () => getAvailableAppointmentSlots(date, duration_limit),
    });
};
