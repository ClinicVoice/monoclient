import { PatientRead } from '@/types/patients';

export interface CreateAppointmentForm {
    doctor_id: number;
    health_card_number: string;
    phone_number: string;
    appt_start_time: string;
    appt_duration_minutes: number;
    notes: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SetAppointmentField = (field: keyof CreateAppointmentForm, value: any) => void;

export interface CreateAppointmentRequest {
    doctor_id: number;
    health_card_number: string;
    phone_number: string;
    appt_start_time: string;
    appt_duration_minutes: number;
    notes: string;
}

export interface AppointmentRead {
    id: number;
    doctor_id: number;
    health_card_number: string;
    phone_number?: string;
    appt_start_time: string; // ISO‑8601 datetime
    appt_duration_minutes: number;
    appt_end_time: string; // ISO‑8601 datetime
    patient: PatientRead;
    notes?: string;
    created_at: string; // ISO‑8601 datetime
}

export interface AppointmentUpdateRequest {
    doctor_id?: number;
    health_card_number?: string;
    phone_number?: string;
    appt_start_time?: string;
    appt_duration_minutes?: number;
    notes?: string;
}
