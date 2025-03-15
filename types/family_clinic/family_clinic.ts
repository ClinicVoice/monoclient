export interface TimeRange {
    start: string;
    end: string;
}

export interface FamilyClinicProviderRestrictions {
    daily_unavailable_ranges?: TimeRange[];
    time_off_ranges?: TimeRange[];
}

export interface FamilyClinicProvider {
    provider_id: string;
    name: string;
    appointment_duration: number;
    restrictions?: FamilyClinicProviderRestrictions;
}

export interface FamilyClinicOpeningHours {
    [day: string]: { open: string; close: string } | null;
}

export interface FamilyClinicConfig {
    family_clinic_id: string;
    name: string;
    doctor_name: string;
    address: string;
    phone: string;
    email: string;
    opening_hours: FamilyClinicOpeningHours;
    providers: FamilyClinicProvider[];
    appointment_types: string[];
    restrictions?: FamilyClinicProviderRestrictions;
}
