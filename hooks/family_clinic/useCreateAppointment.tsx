import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAppointment } from '@/services/familyClinicService';
import { AxiosError } from 'axios';
import {
    CreateAppointmentRequest,
    CreateAppointmentResponse,
} from '@/types/family_clinic/appointment_records';

export const useCreateAppointment = () => {
    const queryClient = useQueryClient();

    return useMutation<CreateAppointmentResponse, AxiosError, CreateAppointmentRequest>({
        mutationFn: createAppointment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
            queryClient.invalidateQueries({ queryKey: ['availableAppointments'] });
        },
    });
};
