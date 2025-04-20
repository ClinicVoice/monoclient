import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { deleteAppointment } from '@/services/appointmentService';

export const useDeleteAppointment = (appointmentId: number) => {
    const qc = useQueryClient();
    return useMutation<void, AxiosError>({
        mutationFn: () => deleteAppointment(appointmentId),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ['appointment', appointmentId] });
            await qc.invalidateQueries({ queryKey: ['doctorAppointments'] });
        },
    });
};
