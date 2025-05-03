import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PatientRead } from '@/types/patients';
import { getPatientById } from '@/services/patientService';

export const usePatient = (patientId: number) =>
    useQuery<PatientRead, AxiosError>({
        queryKey: ['patient', patientId],
        queryFn: () => getPatientById(patientId),
        enabled: Boolean(patientId),
    });
