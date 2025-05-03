export interface PatientCreate {
    health_card_number: string;
    surname: string;
    first_name: string;
    phone_number: string;
    doctor_id: number;
    clinic_id: number;
}

export interface PatientRead extends PatientCreate {
    id: number;
    created_at: string; // ISO 8601 timestamp
}

export interface ListPatientsParams {
    page?: number;
    limit?: number;
    doctor_id?: number;
    surname?: string;
    first_name?: string;
    phone?: string;
}

export interface PatientUpdate {
    health_card_number?: string;
    surname?: string;
    first_name?: string;
    phone_number?: string;
    doctor_id?: number;
    clinic_id?: number;
}
