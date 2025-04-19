import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ClinicRead, ClinicUpdateRequest } from '@/types/clinics';
import { AxiosError } from 'axios';
import { updateClinic } from '@/services/clinicService';

export const useUpdateClinic = (clinicId: number) => {
    const qc = useQueryClient();
    return useMutation<ClinicRead, AxiosError, ClinicUpdateRequest>({
        mutationFn: (data) => updateClinic(clinicId, data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['clinic', clinicId] });
            qc.invalidateQueries({ queryKey: ['clinics'] });
        },
    });
};
