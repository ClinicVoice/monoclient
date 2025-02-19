export interface CreateAppointmentForm {
    provider: string;
    email: string;
    contact: string;
    appointment_type: string;
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
    appointment_type: string;
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

export interface GetAvailableAppointmentSlotsResponse {
    available_times: string[][];
}

export interface AppointmentRecordRequest {
    provider: string;
    appointment_type: string;
    health_card_number: string;
    health_card_version: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    appointment_date: string;
    appointment_time_epoch: string;
    duration: string;
    birth_date: string;
    sex: string;
    pharmacy: string;
    notes: string;
    request_timestamp: string;
}

export interface GetAppointmentRecordRequestsResponse {
    scheduled_appointments: AppointmentRecordRequest[];
}
