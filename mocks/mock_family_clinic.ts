import { FamilyClinic } from '@/types/family_clinic/family_clinic';

export const mockFamilyClinic: FamilyClinic = {
    familyClinicId: '1',
    name: "Dr. Gordon Yao's Clinic",
    doctorName: 'Dr. Gordon Yao',
    address: '10909 Yonge Street, Unit 57 Richmond Hill, Ontario, L4C 3E3',
    phone: '(289) 813-8179',
    email: 'drgordonyao@gmail.com',
    openingHours: {
        Monday: { open: '10:00 AM', close: '5:00 PM' },
        Tuesday: null,
        Wednesday: { open: '10:00 AM', close: '5:00 PM' },
        Thursday: { open: '10:00 AM', close: '5:00 PM' },
        Friday: null,
        Saturday: { open: '9:00 AM', close: '2:00 PM' },
        Sunday: null,
    },
    providers: [
        { name: 'Junyi Li', appointmentDuration: 15 },
        { name: 'Xiao Qing Li', appointmentDuration: 10 },
        { name: 'Gordon Yao', appointmentDuration: 15 },
    ],
    appointmentTypes: ['Dr. Gordon Yao Appointment', 'Dr. Junyi (Jesse) Li Appointment'],
    restrictions: {
        unavailableDays: ['2023-12-25', '2024-01-01'],
        dailyUnavailableRanges: [{ start: '12:00', end: '13:00' }],
        restrictedDays: [
            {
                date: '2023-11-24',
                unavailableRanges: [{ start: '14:00', end: '16:00' }],
            },
        ],
    },
};
