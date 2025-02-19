import axiosInstance from '@/instances/axiosInstance';
import {
    CreateAppointmentRequest,
    CreateAppointmentResponse,
    GetAppointmentRecordRequestsResponse,
    GetAvailableAppointmentSlotsResponse,
} from '@/types/family_clinic/appointment_records';

/**
 * Create a new appointment
 * @param data - Appointment details
 * @returns Success message
 */
export const createAppointment = async (
    data: CreateAppointmentRequest,
): Promise<CreateAppointmentResponse> => {
    try {
        const response = await axiosInstance.post('/public/family_clinic/appointments', data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create appointment');
    }
};

/**
 * Get available appointment slots for a given date
 * @param date - The appointment date in ISO format (YYYY-MM-DD)
 * @param duration_limit - The intended duration of the appointment in minutes
 * @returns Available appointment slots
 */
export const getAvailableAppointmentSlots = async (
    date: string,
    duration_limit: number = 30,
): Promise<GetAvailableAppointmentSlotsResponse> => {
    try {
        const response = await axiosInstance.get('/public/family_clinic/appointments/available', {
            params: { date, duration_minutes: duration_limit },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch available appointment slots');
    }
};

/**
 * Fetch scheduled appointment requests for a given date.
 * @param date - The appointment date in ISO format (YYYY-MM-DD).
 * @returns List of scheduled appointment requests.
 */
export const getScheduledAppointmentsByDate = async (
    date: string,
): Promise<GetAppointmentRecordRequestsResponse> => {
    const response = await axiosInstance.get('/internal/family_clinic/appointments/requests/date', {
        params: { date },
    });
    return response.data;
};

/**
 * Fetch the most recent scheduled appointment requests.
 * @param limit - Number of recent appointments to fetch (default is 5).
 * @returns List of recent appointment requests.
 */
export const getRecentScheduledAppointments = async (
    limit: number = 5,
): Promise<GetAppointmentRecordRequestsResponse> => {
    const response = await axiosInstance.get(
        '/internal/family_clinic/appointments/requests/recent',
        {
            params: { limit },
        },
    );
    return response.data;
};
