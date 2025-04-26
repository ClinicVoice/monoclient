import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DailyBlockRead, DailyBlockUpdate } from '@/types/doctorAvailabilities';
import { AxiosError } from 'axios';
import { updateDailyBlock } from '@/services/doctorAvailabilityService';

export const useUpdateDailyBlock = (doctorId: number) => {
    const qc = useQueryClient();
    return useMutation<DailyBlockRead, AxiosError, { blockId: number; data: DailyBlockUpdate }>({
        mutationFn: ({ blockId, data }) => updateDailyBlock(doctorId, blockId, data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['doctor', doctorId, 'dailyBlocks'] }),
    });
};
