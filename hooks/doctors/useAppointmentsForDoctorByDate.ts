import { useQuery } from '@tanstack/react-query';
import { AppointmentRead } from '@/types/appointments';
import { AxiosError } from 'axios';
import { getAppointmentsForDoctorByDate } from '@/services/doctorService';

export const useAppointmentsForDoctorByDate = (
    doctorId: number,
    date: string, // "YYYY‑MM‑DD"
) =>
    useQuery<AppointmentRead[], AxiosError>({
        queryKey: ['doctorAppointments', doctorId, date],
        queryFn: () => getAppointmentsForDoctorByDate(doctorId, date),
        enabled: !!doctorId && !!date,
    });
