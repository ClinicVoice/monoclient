import axiosInstance from '@/instances/axiosInstance';
import {
    ClinicRead,
    CreateClinicRequest,
    ClinicUpdateRequest,
    ListClinicsParams,
} from '@/types/clinics';
import { DoctorRead, ListDoctorsParams } from '@/types/doctors';
import { ClinicOpeningHours } from '@/types/openingHours';
import { ListResultRequestsParams, ResultRequestRead } from '@/types/resultRequests';
import { ListPatientsParams, PatientRead } from '@/types/patients';

export const listClinics = (params?: ListClinicsParams) =>
    axiosInstance.get<ClinicRead[]>('/public/clinics/', { params }).then((r) => r.data);

export const getClinic = (clinicId: number) =>
    axiosInstance.get<ClinicRead>(`/public/clinics/${clinicId}`).then((r) => r.data);

export const createClinic = (data: CreateClinicRequest) =>
    axiosInstance.post<ClinicRead>('/public/clinics/', data).then((r) => r.data);

export const updateClinic = (clinicId: number, data: ClinicUpdateRequest) =>
    axiosInstance.put<ClinicRead>(`/public/clinics/${clinicId}`, data).then((r) => r.data);

export const getDoctorsByClinic = (clinicId: number, params?: ListDoctorsParams) =>
    axiosInstance
        .get<DoctorRead[]>(`/public/clinics/${clinicId}/doctors`, { params })
        .then((r) => r.data);

export const getOpeningHoursForClinic = (clinicId: number) =>
    axiosInstance
        .get<ClinicOpeningHours>(`/public/clinics/${clinicId}/opening-hours`)
        .then((r) => r.data);

export const updateOpeningHoursForClinic = (
    clinicId: number,
    data: ClinicOpeningHours,
): Promise<ClinicOpeningHours> =>
    axiosInstance
        .put<ClinicOpeningHours>(`/public/clinics/${clinicId}/opening-hours`, data)
        .then((r) => r.data);

export const getResultRequestsByClinic = (clinicId: number, params?: ListResultRequestsParams) =>
    axiosInstance
        .get<ResultRequestRead[]>(`/public/clinics/${clinicId}/result-requests`, { params })
        .then((r) => r.data);
export const getPatientsByClinic = (clinicId: number, params?: ListPatientsParams) =>
    axiosInstance
        .get<PatientRead[]>(`/public/clinics/${clinicId}/patients`, { params })
        .then((r) => r.data);
