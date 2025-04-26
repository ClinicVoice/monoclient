import { useQuery } from '@tanstack/react-query';
import { DoctorTimeOffRead } from '@/types/doctorAvailabilities';
import { AxiosError } from 'axios';
import { listTimeOff } from '@/services/doctorAvailabilityService';

export const useTimeOff = (doctorId: number) =>
    useQuery<DoctorTimeOffRead[], AxiosError>({
        queryKey: ['doctor', doctorId, 'timeOff'],
        queryFn: () => listTimeOff(doctorId),
        enabled: !!doctorId,
    });
