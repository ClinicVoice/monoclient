import axiosInstance from '@/instances/axiosInstance';
import {
    CreateAppointmentRequest,
    CreateAppointmentResponse,
    GetAppointmentRecordRequestsResponse,
    GetAvailableAppointmentSlotsResponse,
} from '@/types/family_clinic/appointment_records';
import { FamilyClinicConfig } from '@/types/family_clinic/family_clinic';
import { mockFamilyClinic } from '@/mocks/mock_family_clinic';
import { GetRecentTestResultsRequestsResponse } from '@/types/family_clinic/test_results_requests';

/**
 * Create a new appointment
 * @param data - Appointment details
 * @returns Success message
 */
export const createAppointment = async (
    data: CreateAppointmentRequest,
): Promise<CreateAppointmentResponse> => {
    const response = await axiosInstance.post('/public/family_clinic/appointments', data);
    return response.data;
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
    const response = await axiosInstance.get('/public/family_clinic/appointments/available', {
        params: { date, duration_minutes: duration_limit },
    });
    return response.data;
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getFamilyClinicInfo = async (familyClinicId: string): Promise<FamilyClinicConfig> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockFamilyClinic), 500);
    });
};

/**
 * Fetch the most recent test results requests.
 * @param limit - Number of recent test results requests to fetch (default is 5).
 * @returns List of recent test results requests.
 */
export const getRecentTestResultsRequests = async (
    limit: number = 5,
): Promise<GetRecentTestResultsRequestsResponse> => {
    const response = await axiosInstance.get(
        '/internal/family_clinic/tests/results_request/recent',
        {
            params: { limit },
        },
    );
    return response.data;
};
