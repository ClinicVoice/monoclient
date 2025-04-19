import { FamilyClinicConfig } from '@/types/clinics';

export const mockFamilyClinic: FamilyClinicConfig = {
    family_clinic_id: '1',
    name: "Dr. Gordon Yao's Clinic",
    doctor_name: 'Dr. Gordon Yao',
    address: '10909 Yonge Street, Unit 57 Richmond Hill, Ontario, L4C 3E3',
    phone: '(289) 813-8179',
    email: 'drgordonyao@gmail.com',
    opening_hours: {
        Monday: { open: '10:00 AM', close: '5:00 PM' },
        Tuesday: null,
        Wednesday: { open: '10:00 AM', close: '5:00 PM' },
        Thursday: { open: '10:00 AM', close: '5:00 PM' },
        Friday: null,
        Saturday: { open: '9:00 AM', close: '2:00 PM' },
        Sunday: null,
    },
    providers: [
        {
            provider_id: '1',
            name: 'Junyi Li',
            appointment_duration: 15,
            restrictions: {
                daily_unavailable_ranges: [{ start: '12:00', end: '13:00' }],
                time_off_ranges: [
                    {
                        start: new Date('2025-03-15T09:00:00.000Z').toISOString(),
                        end: new Date('2025-03-15T17:00:00.000Z').toISOString(),
                    },
                    {
                        start: new Date('2025-03-20T10:00:00.000Z').toISOString(),
                        end: new Date('2025-03-20T14:00:00.000Z').toISOString(),
                    },
                ],
            },
        },
        {
            provider_id: '2',
            name: 'Xiao Qing Li',
            appointment_duration: 10,
            restrictions: {
                daily_unavailable_ranges: [{ start: '12:00', end: '13:00' }],
                time_off_ranges: [
                    {
                        start: new Date('2025-03-15T09:00:00.000Z').toISOString(),
                        end: new Date('2025-03-15T17:00:00.000Z').toISOString(),
                    },
                    {
                        start: new Date('2025-03-20T10:00:00.000Z').toISOString(),
                        end: new Date('2025-03-20T14:00:00.000Z').toISOString(),
                    },
                ],
            },
        },
        {
            provider_id: '3',
            name: 'Gordon Yao',
            appointment_duration: 15,
            restrictions: {
                daily_unavailable_ranges: [{ start: '12:00', end: '13:00' }],
                time_off_ranges: [
                    {
                        start: new Date('2025-03-15T09:00:00.000Z').toISOString(),
                        end: new Date('2025-03-15T17:00:00.000Z').toISOString(),
                    },
                    {
                        start: new Date('2025-03-20T10:00:00.000Z').toISOString(),
                        end: new Date('2025-03-20T14:00:00.000Z').toISOString(),
                    },
                ],
            },
        },
    ],
    appointment_types: ['Dr. Gordon Yao Appointment', 'Dr. Junyi (Jesse) Li Appointment'],
    restrictions: {
        daily_unavailable_ranges: [{ start: '12:00', end: '13:00' }],
        time_off_ranges: [
            {
                start: new Date('2025-03-15T09:00:00.000Z').toISOString(),
                end: new Date('2025-03-15T17:00:00.000Z').toISOString(),
            },
            {
                start: new Date('2025-03-20T10:00:00.000Z').toISOString(),
                end: new Date('2025-03-20T14:00:00.000Z').toISOString(),
            },
        ],
    },
};
