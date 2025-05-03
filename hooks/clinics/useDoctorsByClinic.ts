import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { DoctorRead, ListDoctorsParams } from '@/types/doctors';
import { getDoctorsByClinic } from '@/services/clinicService';

export const useDoctorsByClinic = (clinicId: number, params?: ListDoctorsParams) =>
    useQuery<DoctorRead[], AxiosError, DoctorRead[], ['clinicDoctors', number, ListDoctorsParams?]>(
        {
            queryKey: ['clinicDoctors', clinicId, params],
            queryFn: () => getDoctorsByClinic(clinicId, params ?? {}),
            enabled: !!clinicId,
            staleTime: 1000 * 60 * 5,
            retry: 1,
        },
    );
