import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DoctorTimeOffCreate, DoctorTimeOffRead } from '@/types/doctorAvailabilities';
import { AxiosError } from 'axios';
import { createTimeOff } from '@/services/doctorAvailabilityService';

export const useCreateTimeOff = (doctorId: number) => {
    const qc = useQueryClient();
    return useMutation<DoctorTimeOffRead, AxiosError, DoctorTimeOffCreate>({
        mutationFn: (data) => createTimeOff(doctorId, data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['doctor', doctorId, 'timeOff'] }),
    });
};
