import { useRecentScheduledAppointments } from '@/hooks/family_clinic/useRecentScheduledAppointments';
import AppointmentRecordRequestsTable from '@/components/family-clinic/admin/AppointmentRecordRequestsTable';
import { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

export default function RecentAppointmentRequestsTable() {
    const [limit, setLimit] = useState(5);
    const queryClient = useQueryClient();
    const { data, isLoading } = useRecentScheduledAppointments(limit);
    const appointments = data?.scheduled_appointments || [];

    const refreshData = () => {
        queryClient.invalidateQueries({ queryKey: ['recentScheduledAppointments'] });
    };

    return (
        <AppointmentRecordRequestsTable
            title="Recent Appointment Requests"
            appointments={appointments}
            isLoading={isLoading}
            onExportFilename="RecentAppointments"
            onRefresh={refreshData}
        >
            <FormControl fullWidth margin="normal">
                <InputLabel>Limit</InputLabel>
                <Select
                    label="Limit"
                    sx={{ textAlign: 'left' }}
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                >
                    {[5, 10, 15, 20, 25].map((num) => (
                        <MenuItem key={num} value={num}>
                            {num}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </AppointmentRecordRequestsTable>
    );
}
