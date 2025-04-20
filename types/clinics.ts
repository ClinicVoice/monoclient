export interface CreateClinicRequest {
    name: string;
    address: string;
    phone: string;
    email: string;
    accepting_new_patients: boolean;
}

export interface ClinicUpdateRequest {
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
    accepting_new_patients?: boolean;
}

export interface ClinicRead {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    accepting_new_patients: boolean;
    created_at: string; // ISO‑8601 datetime
}
