import { AppointmentRead } from '@/types/appointments';
import { ResultRequestRead } from '@/types/resultRequests';
import { format } from 'date-fns';

export const exportAppointmentsToCSV = (
    appointments: AppointmentRead[],
    filenamePrefix: string,
) => {
    if (!appointments.length) {
        alert('No data to export');
        return;
    }

    const timestamp = format(new Date(), 'yyyyMMdd-HHmmss');
    const headers = [
        'ID',
        'Doctor ID',
        'Health Card Number',
        'Phone Number',
        'Start Date',
        'Start Time',
        'End Date',
        'End Time',
        'Duration (minutes)',
        'Notes',
        'Created At',
    ];

    const rows = appointments.map((app) => {
        const start = new Date(app.appt_start_time);
        const end = new Date(app.appt_end_time);
        const created = new Date(app.created_at);
        return [
            app.id.toString(),
            app.doctor_id.toString(),
            app.health_card_number,
            app.phone_number || '',
            format(start, 'yyyy-MM-dd'),
            format(start, 'HH:mm'),
            format(end, 'yyyy-MM-dd'),
            format(end, 'HH:mm'),
            app.appt_duration_minutes.toString(),
            app.notes || '',
            format(created, 'yyyy-MM-dd HH:mm:ss'),
        ];
    });

    const csvContent = [headers, ...rows]
        .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${filenamePrefix}-${timestamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Export result requests array to CSV using updated ResultRequestRead type
export const exportResultRequestsToCSV = (
    requests: ResultRequestRead[],
    filenamePrefix: string,
) => {
    if (!requests.length) {
        alert('No data to export');
        return;
    }

    const timestamp = format(new Date(), 'yyyyMMdd-HHmmss');
    const headers = [
        'ID',
        'Clinic ID',
        'Health Card Number',
        'First Name',
        'Last Name',
        'Requested Item',
        'Email',
        'Phone Number',
        'Created At',
    ];

    const rows = requests.map((req) => {
        const created = new Date(req.created_at);
        return [
            req.id,
            req.clinic_id.toString(),
            req.health_card_number,
            req.first_name,
            req.last_name,
            req.requested_item,
            req.email,
            req.phone_number || '',
            format(created, 'yyyy-MM-dd HH:mm:ss'),
        ];
    });

    const csvContent = [headers, ...rows]
        .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${filenamePrefix}-${timestamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
