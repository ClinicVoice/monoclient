import { useQuery } from '@tanstack/react-query';
import { ListResultRequestsParams, ResultRequestRead } from '@/types/resultRequests';
import { AxiosError } from 'axios';
import { getResultRequestsByClinic } from '@/services/clinicService';

export const useResultRequestsByClinic = (clinicId: number, params?: ListResultRequestsParams) =>
    useQuery<
        ResultRequestRead[],
        AxiosError,
        ResultRequestRead[],
        ['clinicResultRequests', number, ListResultRequestsParams?]
    >({
        queryKey: ['clinicResultRequests', clinicId, params],
        queryFn: () => getResultRequestsByClinic(clinicId, params ?? {}),
        enabled: Boolean(clinicId),
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
