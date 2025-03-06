export interface TimeRange {
    start: string;
    end: string;
}

export interface RestrictedDay {
    date: string;
    unavailableRanges: TimeRange[];
}

export interface FamilyClinicRestrictions {
    unavailableDays?: string[];
    dailyUnavailableRanges?: TimeRange[];
    restrictedDays?: RestrictedDay[];
}

export interface FamilyClinicProvider {
    name: string;
    appointmentDuration: number;
}

export interface FamilyClinicOpeningHours {
    [day: string]: { open: string; close: string } | null;
}

export interface FamilyClinic {
    familyClinicId: string;
    name: string;
    doctorName: string;
    address: string;
    phone: string;
    email: string;
    openingHours: FamilyClinicOpeningHours;
    providers: FamilyClinicProvider[];
    appointmentTypes: string[];
    restrictions?: FamilyClinicRestrictions;
}
