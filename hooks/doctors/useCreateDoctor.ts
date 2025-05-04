import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createDoctor } from '@/services/doctorService';
import { DoctorRead, DoctorCreateRequest } from '@/types/doctors';

export const useCreateDoctor = () => {
    const qc = useQueryClient();
    return useMutation<DoctorRead, AxiosError, DoctorCreateRequest>({
        mutationFn: createDoctor,
        onSuccess: (newDoctor) => {
            qc.invalidateQueries({ queryKey: ['clinicDoctors'] });
            qc.invalidateQueries({ queryKey: ['doctor', newDoctor.id] });
        },
    });
};
