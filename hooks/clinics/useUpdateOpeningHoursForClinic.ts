import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ClinicOpeningHours } from '@/types/openingHours';
import { updateOpeningHoursForClinic } from '@/services/clinicService';

export const useUpdateOpeningHoursForClinic = (clinicId: number) => {
    const qc = useQueryClient();

    return useMutation<ClinicOpeningHours, AxiosError, ClinicOpeningHours>({
        mutationFn: (data) => updateOpeningHoursForClinic(clinicId, data),
        onSuccess: () => {
            // Refresh opening hours and clinic detail
            qc.invalidateQueries({ queryKey: ['clinicOpeningHours', clinicId] });
            qc.invalidateQueries({ queryKey: ['clinic', clinicId] });
        },
    });
};
