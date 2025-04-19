import { useQuery } from '@tanstack/react-query';
import { ClinicRead } from '@/types/clinics';
import { AxiosError } from 'axios';
import { getClinic } from '@/services/clinicService';

export const useClinic = (clinicId: number) =>
    useQuery<ClinicRead, AxiosError>({
        queryKey: ['clinic', clinicId],
        queryFn: () => getClinic(clinicId),
        enabled: !!clinicId,
    });
