import {
    DailyBlockCreate,
    DailyBlockRead,
    DailyBlockUpdate,
    DoctorTimeOffCreate,
    DoctorTimeOffRead,
    DoctorTimeOffUpdate,
} from '@/types/doctorAvailabilities';
import axiosInstance from '@/instances/axiosInstance';

export const listDailyBlocks = (doctorId: number): Promise<DailyBlockRead[]> =>
    axiosInstance
        .get<DailyBlockRead[]>(`/public/doctors/${doctorId}/daily-blocks`)
        .then((res) => res.data);

export const createDailyBlock = (
    doctorId: number,
    data: DailyBlockCreate,
): Promise<DailyBlockRead> =>
    axiosInstance
        .post<DailyBlockRead>(`/public/doctors/${doctorId}/daily-blocks`, data)
        .then((res) => res.data);

export const updateDailyBlock = (
    doctorId: number,
    blockId: number,
    data: DailyBlockUpdate,
): Promise<DailyBlockRead> =>
    axiosInstance
        .put<DailyBlockRead>(`/public/doctors/${doctorId}/daily-blocks/${blockId}`, data)
        .then((res) => res.data);

export const deleteDailyBlock = (doctorId: number, blockId: number): Promise<void> =>
    axiosInstance
        .delete<void>(`/public/doctors/${doctorId}/daily-blocks/${blockId}`)
        .then(() => {});

export const listTimeOff = (doctorId: number): Promise<DoctorTimeOffRead[]> =>
    axiosInstance
        .get<DoctorTimeOffRead[]>(`/public/doctors/${doctorId}/time-off`)
        .then((res) => res.data);

export const createTimeOff = (
    doctorId: number,
    data: DoctorTimeOffCreate,
): Promise<DoctorTimeOffRead> =>
    axiosInstance
        .post<DoctorTimeOffRead>(`/public/doctors/${doctorId}/time-off`, data)
        .then((res) => res.data);

export const updateTimeOff = (
    doctorId: number,
    timeOffId: number,
    data: DoctorTimeOffUpdate,
): Promise<DoctorTimeOffRead> =>
    axiosInstance
        .put<DoctorTimeOffRead>(`/public/doctors/${doctorId}/time-off/${timeOffId}`, data)
        .then((res) => res.data);

export const deleteTimeOff = (doctorId: number, timeOffId: number): Promise<void> =>
    axiosInstance.delete<void>(`/public/doctors/${doctorId}/time-off/${timeOffId}`).then(() => {});
