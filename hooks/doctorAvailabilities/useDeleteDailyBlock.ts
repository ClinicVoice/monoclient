import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { deleteDailyBlock } from '@/services/doctorAvailabilityService';

export const useDeleteDailyBlock = (doctorId: number) => {
    const qc = useQueryClient();
    return useMutation<void, AxiosError, number>({
        mutationFn: (blockId) => deleteDailyBlock(doctorId, blockId),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['doctor', doctorId, 'dailyBlocks'] }),
    });
};
