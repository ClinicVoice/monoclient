import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DailyBlockCreate, DailyBlockRead } from '@/types/doctorAvailabilities';
import { AxiosError } from 'axios';
import { createDailyBlock } from '@/services/doctorAvailabilityService';

export const useCreateDailyBlock = (doctorId: number) => {
    const qc = useQueryClient();
    return useMutation<DailyBlockRead, AxiosError, DailyBlockCreate>({
        mutationFn: (data) => createDailyBlock(doctorId, data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['doctor', doctorId, 'dailyBlocks'] }),
    });
};
