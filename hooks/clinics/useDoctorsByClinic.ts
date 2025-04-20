import { useQuery } from '@tanstack/react-query';
import { DoctorRead } from '@/types/doctors';
import { AxiosError } from 'axios';
import { getDoctorsByClinic } from '@/services/clinicService';

export const useDoctorsByClinic = (clinicId: number) =>
    useQuery<DoctorRead[], AxiosError>({
        queryKey: ['clinicDoctors', clinicId],
        queryFn: () => getDoctorsByClinic(clinicId),
        enabled: !!clinicId,
    });
