export interface ResultRequestBase {
    clinic_id: number;
    health_card_number: string;
    first_name: string;
    last_name: string;
    requested_item: string;
    email: string;
    phone_number?: string;
}

export type ResultRequestCreate = ResultRequestBase;

export interface ResultRequestRead extends ResultRequestBase {
    id: string; // UUID
    created_at: string; // ISO‑8601 datetime
}

export interface ResultRequestUpdate {
    clinic_id?: number;
    first_name?: string;
    last_name?: string;
    requested_item?: string;
    email?: string;
    phone_number?: string;
}

export interface ListResultRequestsParams {
    page?: number;
    limit?: number;
    first_name?: string;
    last_name?: string;
    requested_item?: string;
    email?: string;
    phone?: string;
}
