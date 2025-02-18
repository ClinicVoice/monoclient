export interface CreateAppointmentForm {
    provider: string;
    email: string;
    contact: string;
    appointmentType: string;
    note: string;
    date: string;
    time: string;
    hasHealthCard: boolean;
    healthCardNumber: string;
    healthCardVersion: string;
    firstName: string;
    lastName: string;
    birthday: string;
    sex: string;
    pharmacy: string;
}

export type SetAppointmentField = (field: keyof CreateAppointmentForm, value: any) => void;

export interface CreateAppointmentRequest {
    provider: string;
    appointmentType: string;
    health_card_number: string;
    health_card_version: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    appointment_date_time: string;
    birth_date: string;
    sex: string;
    pharmacy: string;
    notes: string;
}

export interface CreateAppointmentResponse {
    message: string;
}

export interface GetAvailableAppointmentSlotsRequest {
    date: string;
    duration_limit: number;
}

export interface GetAvailableAppointmentSlotsRequest {
    available_slots: string[][];
}
