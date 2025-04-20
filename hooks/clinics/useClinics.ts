import { useQuery } from '@tanstack/react-query';
import { ClinicRead } from '@/types/clinics';
import { AxiosError } from 'axios';
import { listClinics } from '@/services/clinicService';

export const useClinics = () =>
    useQuery<ClinicRead[], AxiosError>({
        queryKey: ['clinics'],
        queryFn: listClinics,
    });
