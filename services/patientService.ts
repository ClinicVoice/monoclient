import axiosInstance from '@/instances/axiosInstance';
import { PatientCreate, PatientRead, PatientUpdate } from '@/types/patients';

export const createPatient = (data: PatientCreate): Promise<PatientRead> =>
    axiosInstance.post<PatientRead>('/public/patients/', data).then((res) => res.data);

export const validateHealthCard = (healthCardNum: string): Promise<boolean> =>
    axiosInstance
        .get<{ valid: boolean }>(`/public/patients/health-card/${healthCardNum}`)
        .then((res) => res.data.valid)
        .catch(() => false);

export const getPatientById = (patientId: number): Promise<PatientRead> =>
    axiosInstance.get<PatientRead>(`/public/patients/${patientId}`).then((res) => res.data);

export const updatePatient = (patientId: number, data: PatientUpdate): Promise<PatientRead> =>
    axiosInstance.put<PatientRead>(`/public/patients/${patientId}`, data).then((res) => res.data);
