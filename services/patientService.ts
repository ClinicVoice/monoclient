import axiosInstance from '@/instances/axiosInstance';
import { PatientCreate, PatientRead } from '@/types/patients';

export const createPatient = (data: PatientCreate): Promise<PatientRead> =>
    axiosInstance.post<PatientRead>('/public/patients/', data).then((res) => res.data);

export const validateHealthCard = (healthCardNum: string): Promise<boolean> =>
    axiosInstance
        .get<{ valid: boolean }>(`/public/patients/health-card/${healthCardNum}`)
        .then((res) => res.data.valid)
        .catch(() => false);
