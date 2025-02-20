import { FamilyClinic } from '@/types/family_clinic/family_clinic';

export const mockFamilyClinic: FamilyClinic = {
    familyClinicId: '1',
    name: 'Greenleaf Family Clinic',
    doctorName: 'Dr. John Doe',
    address: '123 Health St, Toronto, ON',
    phone: '(289) 813-8179',
    email: 'contact@greenleafclinic.com',
    openingHours: {
        Monday: { open: '9:00 AM', close: '5:00 PM' },
        Tuesday: { open: '9:00 AM', close: '5:00 PM' },
        Wednesday: { open: '9:00 AM', close: '5:00 PM' },
        Thursday: { open: '9:00 AM', close: '5:00 PM' },
        Friday: { open: '9:00 AM', close: '5:00 PM' },
        Saturday: { open: '10:00 AM', close: '3:00 PM' },
        Sunday: null,
    },
    providers: ['Dr. John Doe', 'Dr. Jane Smith', 'Dr. Alan Brown'],
    appointmentTypes: ['General Consultation', 'Flu Shot', 'Prescription Refill'],
};
