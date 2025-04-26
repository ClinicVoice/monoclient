import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { validateHealthCard } from '@/services/patientService';

export const useValidateHealthCard = (healthCardNum?: string) =>
    useQuery<boolean, AxiosError>({
        queryKey: ['patients', 'validate', healthCardNum],
        queryFn: () => validateHealthCard(healthCardNum || ''),
        enabled: Boolean(healthCardNum),
    });
