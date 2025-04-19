export interface CreateClinicRequest {
    name: string;
    address: string;
    phone: string;
    email: string;
}

export interface ClinicUpdateRequest {
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
}

export interface ClinicRead {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    created_at: string; // ISO‑8601 datetime
}
