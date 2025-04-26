import axiosInstance from '@/instances/axiosInstance';
import { ClinicRead, CreateClinicRequest, ClinicUpdateRequest } from '@/types/clinics';
import { DoctorRead } from '@/types/doctors';
import { ClinicOpeningHours } from '@/types/openingHours';
import { ResultRequestRead } from '@/types/resultRequests';

export const listClinics = () =>
    axiosInstance.get<ClinicRead[]>('/public/clinics/').then((r) => r.data);

export const getClinic = (clinicId: number) =>
    axiosInstance.get<ClinicRead>(`/public/clinics/${clinicId}`).then((r) => r.data);

export const createClinic = (data: CreateClinicRequest) =>
    axiosInstance.post<ClinicRead>('/public/clinics/', data).then((r) => r.data);

export const updateClinic = (clinicId: number, data: ClinicUpdateRequest) =>
    axiosInstance.put<ClinicRead>(`/public/clinics/${clinicId}`, data).then((r) => r.data);

export const getDoctorsByClinic = (clinicId: number) =>
    axiosInstance.get<DoctorRead[]>(`/public/clinics/${clinicId}/doctors`).then((r) => r.data);

export const getOpeningHoursForClinic = (clinicId: number) =>
    axiosInstance
        .get<ClinicOpeningHours>(`/public/clinics/${clinicId}/opening-hours`)
        .then((r) => r.data);

export const getResultRequestsByClinic = (clinicId: number) =>
    axiosInstance
        .get<ResultRequestRead[]>(`/public/clinics/${clinicId}/result-requests`)
        .then((r) => r.data);
