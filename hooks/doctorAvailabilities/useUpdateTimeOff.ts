import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DoctorTimeOffRead, DoctorTimeOffUpdate } from '@/types/doctorAvailabilities';
import { AxiosError } from 'axios';
import { updateTimeOff } from '@/services/doctorAvailabilityService';

export const useUpdateTimeOff = (doctorId: number) => {
    const qc = useQueryClient();
    return useMutation<
        DoctorTimeOffRead,
        AxiosError,
        { timeOffId: number; data: DoctorTimeOffUpdate }
    >({
        mutationFn: ({ timeOffId, data }) => updateTimeOff(doctorId, timeOffId, data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['doctor', doctorId, 'timeOff'] }),
    });
};
