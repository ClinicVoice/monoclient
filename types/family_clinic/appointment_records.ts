export interface CreateAppointmentRequest {
    health_card_number: string;
    health_card_location: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    appointment_date_time: string;
    duration: number;
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
