import { useQuery } from '@tanstack/react-query';
import { DailyBlockRead } from '@/types/doctorAvailabilities';
import { AxiosError } from 'axios';
import { listDailyBlocks } from '@/services/doctorAvailabilityService';

export const useDailyBlocks = (doctorId: number) =>
    useQuery<DailyBlockRead[], AxiosError>({
        queryKey: ['doctor', doctorId, 'dailyBlocks'],
        queryFn: () => listDailyBlocks(doctorId),
        enabled: !!doctorId,
    });
