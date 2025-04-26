import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PatientCreate, PatientRead } from '@/types/patients';
import { AxiosError } from 'axios';
import { createPatient } from '@/services/patientService';

export const useCreatePatient = () => {
    const qc = useQueryClient();
    return useMutation<PatientRead, AxiosError, PatientCreate>({
        mutationFn: (data) => createPatient(data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['patients'] });
        },
    });
};
