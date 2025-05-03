import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ClinicRead, ListClinicsParams } from '@/types/clinics';
import { listClinics } from '@/services/clinicService';

export const useClinics = (params?: ListClinicsParams) =>
    useQuery<ClinicRead[], AxiosError, ClinicRead[], ['clinics', ListClinicsParams?]>({
        queryKey: ['clinics', params],
        queryFn: () => listClinics(params ?? {}),
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
