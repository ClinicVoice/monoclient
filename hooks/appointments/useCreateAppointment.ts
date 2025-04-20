import { AppointmentRead, CreateAppointmentRequest } from '@/types/appointments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createAppointment } from '@/services/appointmentService';

export const useCreateAppointment = () => {
    const qc = useQueryClient();
    return useMutation<AppointmentRead, AxiosError, CreateAppointmentRequest>({
        mutationFn: (data) => createAppointment(data),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ['doctorAppointments'] });
            await qc.invalidateQueries({ queryKey: ['availableAppointments'] });
        },
    });
};
