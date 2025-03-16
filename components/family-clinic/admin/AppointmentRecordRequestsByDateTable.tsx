import { useScheduledAppointmentsByDate } from '@/hooks/family_clinic/useScheduledAppointmentsByDate';
import AppointmentRecordRequestsTable from '@/components/family-clinic/admin/AppointmentRecordRequestsTable';
import { useState } from 'react';
import { format } from 'date-fns';
import { TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

export default function AppointmentsByDateTable() {
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useScheduledAppointmentsByDate(selectedDate);
    const appointments = data?.scheduled_appointments || [];

    const refreshData = async () => {
        await queryClient.invalidateQueries({ queryKey: ['scheduledAppointments'] });
    };

    return (
        <AppointmentRecordRequestsTable
            title="Appointments by Date"
            appointments={appointments}
            isLoading={isLoading}
            isError={isError}
            onRefresh={refreshData}
            onExportFilename="AppointmentsByDate"
        >
            <TextField
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                fullWidth
                margin="normal"
            />
        </AppointmentRecordRequestsTable>
    );
}
