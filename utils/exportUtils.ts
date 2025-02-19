import { AppointmentRecordRequest } from '@/types/family_clinic/appointment_records';
import { format } from 'date-fns';

export const exportAppointmentRecordRequestsToCSV = (
    appointments: AppointmentRecordRequest[],
    filenamePrefix: string,
) => {
    if (!appointments.length) {
        alert('No data to export');
        return;
    }

    const timestamp = format(new Date(), 'yyyyMMdd-HHmmss');
    const csvContent = [
        [
            'Provider',
            'Appointment Type',
            'Health Card Number',
            'Health Card Version',
            'First Name',
            'Last Name',
            'Phone Number',
            'Email',
            'Appointment Date',
            'Appointment Time',
            'Duration',
            'Birth Date',
            'Sex',
            'Pharmacy',
            'Notes',
            'Request Timestamp',
        ],
        ...appointments.map((app) => [
            app.provider,
            app.appointment_type,
            app.health_card_number,
            app.health_card_version,
            app.first_name,
            app.last_name,
            app.phone_number,
            app.email,
            app.appointment_date,
            new Date(Number(app.appointment_time_epoch) * 1000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
            app.duration,
            app.birth_date,
            app.sex,
            app.pharmacy,
            app.notes,
            new Date(Number(app.request_timestamp) * 1000).toLocaleString(),
        ]),
    ]
        .map((e) => e.join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${filenamePrefix}-${timestamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
