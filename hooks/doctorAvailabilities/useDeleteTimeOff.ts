import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { deleteTimeOff } from '@/services/doctorAvailabilityService';

export const useDeleteTimeOff = (doctorId: number) => {
    const qc = useQueryClient();
    return useMutation<void, AxiosError, number>({
        mutationFn: (timeOffId) => deleteTimeOff(doctorId, timeOffId),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['doctor', doctorId, 'timeOff'] }),
    });
};
