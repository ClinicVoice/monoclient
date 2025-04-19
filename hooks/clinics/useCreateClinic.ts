import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ClinicRead, CreateClinicRequest } from '@/types/clinics';
import { AxiosError } from 'axios';
import { createClinic } from '@/services/clinicService';

export const useCreateClinic = () => {
    const qc = useQueryClient();
    return useMutation<ClinicRead, AxiosError, CreateClinicRequest>({
        mutationFn: (data) => createClinic(data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['clinics'] });
        },
    });
};
