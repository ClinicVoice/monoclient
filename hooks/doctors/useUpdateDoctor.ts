import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { DoctorRead, UpdateDoctorRequest } from '@/types/doctors';
import { updateDoctorById } from '@/services/doctorService';

export const useUpdateDoctor = (doctorId: number) => {
    const qc = useQueryClient();
    return useMutation<DoctorRead, AxiosError, UpdateDoctorRequest>({
        mutationFn: (data) => updateDoctorById(doctorId, data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['doctor', doctorId] });
            qc.invalidateQueries({ queryKey: ['clinicDoctors'] });
        },
    });
};
