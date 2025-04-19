import { useQuery } from '@tanstack/react-query';
import { AppointmentRead } from '@/types/appointments';
import { AxiosError } from 'axios';
import { getAppointment } from '@/services/appointmentService';

export const useAppointment = (appointmentId: number) =>
    useQuery<AppointmentRead, AxiosError>({
        queryKey: ['appointment', appointmentId],
        queryFn: () => getAppointment(appointmentId),
    });
