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
    providers: string[];
    appointmentTypes: string[];
}
