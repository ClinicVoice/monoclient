export interface CreateDoctorRequest {
    name: string;
    clinic_id: number;
    default_appt_duration_minutes: number;
    accepting_new_patients: boolean;
}

export interface DoctorRead {
    id: number;
    name: string;
    clinic_id: number;
    created_at: string; // ISO‑8601 datetime
    default_appt_duration_minutes: number;
    accepting_new_patients: boolean;
}

export interface UpdateDoctorRequest {
    name?: string;
    clinic_id?: number;
    default_appt_duration_minutes?: number;
    accepting_new_patients?: boolean;
}
