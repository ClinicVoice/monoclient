import axiosInstance from '@/instances/axiosInstance';
import {
    CreateAppointmentRequest,
    AppointmentRead,
    AppointmentUpdateRequest,
} from '@/types/appointments';

export const createAppointment = async (
    data: CreateAppointmentRequest,
): Promise<AppointmentRead> => {
    const { data: appointment } = await axiosInstance.post<AppointmentRead>(
        '/public/appointments/',
        data,
    );
    return appointment;
};

export const getAppointment = async (appointmentId: number): Promise<AppointmentRead> => {
    const { data: appointment } = await axiosInstance.get<AppointmentRead>(
        `/public/appointments/${appointmentId}`,
    );
    return appointment;
};

export const updateAppointment = async (
    appointmentId: number,
    data: AppointmentUpdateRequest,
): Promise<AppointmentRead> => {
    const { data: appointment } = await axiosInstance.put<AppointmentRead>(
        `/public/appointments/${appointmentId}`,
        data,
    );
    return appointment;
};

export const deleteAppointment = async (appointmentId: number): Promise<void> => {
    await axiosInstance.delete(`/public/appointments/${appointmentId}`);
};
