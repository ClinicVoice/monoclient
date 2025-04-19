export interface OpeningHourDTO {
    id: number;
    clinic_id: number;
    day_of_week: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
    open_time: string | null; // ISO time "HH:mm:ss" or null
    close_time: string | null; // ISO time "HH:mm:ss" or null
}

export interface TimeRangeDTO {
    open_time: string; // ISO time "HH:mm:ss"
    close_time: string; // ISO time "HH:mm:ss"
}

export interface ClinicOpeningHours {
    clinic_id: number;
    opening_hours: Record<OpeningHourDTO['day_of_week'], TimeRangeDTO | null>;
}
