import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { DoctorRead } from '@/types/doctors';
import { getDoctorById } from '@/services/doctorService';

export const useDoctor = (doctorId: number) =>
    useQuery<DoctorRead, AxiosError>({
        queryKey: ['doctor', doctorId],
        queryFn: () => getDoctorById(doctorId),
        enabled: !!doctorId,
    });
