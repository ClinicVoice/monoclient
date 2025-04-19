import { useQuery } from '@tanstack/react-query';
import { ClinicOpeningHours } from '@/types/openingHours';
import { AxiosError } from 'axios';
import { getOpeningHoursForClinic } from '@/services/clinicService';

export const useOpeningHoursForClinic = (clinicId: number) =>
    useQuery<ClinicOpeningHours, AxiosError>({
        queryKey: ['clinicOpeningHours', clinicId],
        queryFn: () => getOpeningHoursForClinic(clinicId),
        enabled: !!clinicId,
    });
