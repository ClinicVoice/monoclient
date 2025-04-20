import { updateAppointment } from '@/services/appointmentService';
import { AppointmentRead, AppointmentUpdateRequest } from '@/types/appointments';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateAppointment = (appointmentId: number) => {
    const qc = useQueryClient();
    return useMutation<AppointmentRead, AxiosError, AppointmentUpdateRequest>({
        mutationFn: (data) => updateAppointment(appointmentId, data),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ['appointment', appointmentId] });
            await qc.invalidateQueries({ queryKey: ['doctorAppointments'] });
            await qc.invalidateQueries({ queryKey: ['availableAppointments'] });
        },
    });
};
