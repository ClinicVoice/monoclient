export interface DailyBlockBase {
    doctor_id: number;
    day_of_week: string; // e.g. 'monday', 'tuesday', ...
    start_time: string; // 'HH:mm' format
    end_time: string; // 'HH:mm' format
}

export type DailyBlockCreate = DailyBlockBase;

export interface DailyBlockRead extends DailyBlockBase {
    id: number;
    created_at: string; // ISO timestamp
}

export interface DailyBlockUpdate {
    day_of_week?: string;
    start_time?: string;
    end_time?: string;
}

export interface DoctorTimeOffBase {
    doctor_id: number;
    start_datetime: string; // ISO timestamp
    end_datetime: string; // ISO timestamp
    reason?: string;
}

export type DoctorTimeOffCreate = DoctorTimeOffBase;

export interface DoctorTimeOffRead extends DoctorTimeOffBase {
    id: number;
    created_at: string; // ISO timestamp
}

export interface DoctorTimeOffUpdate {
    start_datetime?: string;
    end_datetime?: string;
    reason?: string;
}
