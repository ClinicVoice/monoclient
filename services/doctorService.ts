import { AppointmentRead } from '@/types/appointments';
import axiosInstance from '@/instances/axiosInstance';

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
