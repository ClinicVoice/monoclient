import { AppointmentRead } from '@/types/appointments';
import axiosInstance from '@/instances/axiosInstance';
import { DoctorRead, UpdateDoctorRequest } from '@/types/doctors';

export const getAppointmentsForDoctorByDate = async (
    doctorId: number,
    date: string, // YYYY‑MM‑DD
): Promise<AppointmentRead[]> => {
    const { data: appointments } = await axiosInstance.get<AppointmentRead[]>(
        `/public/doctors/${doctorId}/appointments`,
        { params: { date } },
    );
    return appointments;
};

export const getAvailableSlotsForDoctorByDate = async (
    doctorId: number,
    date: string, // YYYY‑MM‑DD
    durationMinutes: number = 15,
): Promise<string[]> => {
    const { data: slots } = await axiosInstance.get<string[]>(
        `/public/doctors/${doctorId}/available-slots`,
        { params: { date, duration_minutes: durationMinutes } },
    );
    return slots;
};

export const getDoctorById = (doctorId: number): Promise<DoctorRead> =>
    axiosInstance.get<DoctorRead>(`/public/doctors/${doctorId}`).then((res) => res.data);

export const updateDoctorById = (
    doctorId: number,
    data: UpdateDoctorRequest,
): Promise<DoctorRead> =>
    axiosInstance.put<DoctorRead>(`/public/doctors/${doctorId}`, data).then((res) => res.data);
