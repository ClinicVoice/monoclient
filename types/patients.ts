export interface PatientCreate {
    health_card_number: string;
    surname: string;
    first_name: string;
    phone_number: string;
    doctor_id: number;
    clinic_id: number;
}

export interface PatientRead {
    id: number;
    health_card_number: string;
    surname: string;
    first_name: string;
    phone_number: string;
    doctor_id: number;
    clinic_id: number;
    created_at: string; // ISO-8601 datetime
}
