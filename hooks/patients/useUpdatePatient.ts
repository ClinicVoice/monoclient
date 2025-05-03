import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PatientRead, PatientUpdate } from '@/types/patients';
import { AxiosError } from 'axios';
import { updatePatient } from '@/services/patientService';

export const useUpdatePatient = (patientId: number) => {
    const qc = useQueryClient();
    return useMutation<PatientRead, AxiosError, PatientUpdate>({
        mutationFn: (data) => updatePatient(patientId, data),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ['patient', patientId] });
            await qc.invalidateQueries({ queryKey: ['clinicPatients'] });
        },
    });
};
