export interface FamilyClinic {
    familyClinicId: string;
    name: string;
    doctorName: string;
    address: string;
    phone: string;
    email: string;
    openingHours: {
        [day: string]: { open: string; close: string } | null;
    };
    providers: string[];
    appointmentTypes: string[];
}
