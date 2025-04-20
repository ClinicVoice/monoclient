import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getAvailableSlotsForDoctorByDate } from '@/services/doctorService';

export const useAvailableSlotsForDoctorByDate = (
    doctorId: number,
    date: string,
    durationMinutes: number = 15,
) =>
    useQuery<string[], AxiosError>({
        queryKey: ['doctorAvailableSlots', doctorId, date, durationMinutes],
        queryFn: () => getAvailableSlotsForDoctorByDate(doctorId, date, durationMinutes),
        enabled: !!doctorId && !!date,
    });
