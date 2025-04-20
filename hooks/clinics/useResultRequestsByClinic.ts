import { useQuery } from '@tanstack/react-query';
import { ResultRequestRead } from '@/types/resultRequests';
import { AxiosError } from 'axios';
import { getResultRequestsByClinic } from '@/services/clinicService';

export const useResultRequestsByClinic = (clinicId: number) =>
    useQuery<ResultRequestRead[], AxiosError>({
        queryKey: ['clinicResultRequests', clinicId],
        queryFn: () => getResultRequestsByClinic(clinicId),
        enabled: !!clinicId,
    });
