import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PatientRead, ListPatientsParams } from '@/types/patients';
import { getPatientsByClinic } from '@/services/clinicService';

export const usePatientsByClinic = (clinicId: number, params?: ListPatientsParams) =>
    useQuery<
        PatientRead[],
        AxiosError,
        PatientRead[],
        ['clinicPatients', number, ListPatientsParams?]
    >({
        queryKey: ['clinicPatients', clinicId, params],
        queryFn: () => getPatientsByClinic(clinicId, params ?? {}),
        enabled: Boolean(clinicId),
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
