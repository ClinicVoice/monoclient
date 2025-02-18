'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    CircularProgress,
    Alert,
    Box,
} from '@mui/material';
import { TableCard } from '@/components/family-clinic/admin/styles';
import { AppointmentRecordRequest } from '@/types/family_clinic/appointment_records';
import { exportAppointmentRecordRequestsToCSV } from '@/utils/exportUtils';

interface AppointmentsTableProps {
    title: string;
    children?: React.ReactNode;
    appointments: AppointmentRecordRequest[];
    isLoading?: boolean;
    isError?: boolean;
    onRefresh?: () => void;
    onExportFilename: string;
}

export default function AppointmentRecordRequestsTable({
    title,
    children,
    appointments,
    isLoading,
    isError,
    onRefresh,
    onExportFilename,
}: AppointmentsTableProps) {
    return (
        <TableCard>
            <Typography variant="h3" gutterBottom>
                {title}
            </Typography>

            {!isLoading && !isError && appointments.length > 0 && (
                <Box display="flex" justifyContent="space-between" mt={2}>
                    {onRefresh && (
                        <Button variant="contained" color="secondary" onClick={onRefresh}>
                            Refresh
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                            exportAppointmentRecordRequestsToCSV(appointments, onExportFilename)
                        }
                    >
                        Export to CSV
                    </Button>
                </Box>
            )}

            {children}

            {isLoading && (
                <Typography align="center" sx={{ mt: 2 }}>
                    <CircularProgress />
                </Typography>
            )}

            {isError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    Failed to load appointments. Please try again later.
                </Alert>
            )}

            {!isLoading && !isError && appointments.length === 0 && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                    No appointments found.
                </Alert>
            )}

            {!isLoading && !isError && appointments.length > 0 && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Provider</TableCell>
                                <TableCell>Appointment Type</TableCell>
                                <TableCell>Health Card</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Duration (mins)</TableCell>
                                <TableCell>Birth Date</TableCell>
                                <TableCell>Sex</TableCell>
                                <TableCell>Pharmacy</TableCell>
                                <TableCell>Notes</TableCell>
                                <TableCell>Request Timestamp</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appointments.map((app, index) => (
                                <TableRow key={index}>
                                    <TableCell>{app.provider}</TableCell>
                                    <TableCell>{app.appointmentType}</TableCell>
                                    <TableCell>{app.health_card_number}</TableCell>
                                    <TableCell>{app.first_name}</TableCell>
                                    <TableCell>{app.last_name}</TableCell>
                                    <TableCell>{app.phone_number}</TableCell>
                                    <TableCell>{app.email}</TableCell>
                                    <TableCell>{app.appointment_date}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            Number(app.appointment_time_epoch) * 1000,
                                        ).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </TableCell>
                                    <TableCell>{app.duration}</TableCell>
                                    <TableCell>{app.birth_date}</TableCell>
                                    <TableCell>{app.sex}</TableCell>
                                    <TableCell>{app.pharmacy}</TableCell>
                                    <TableCell>{app.notes}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            Number(app.request_timestamp) * 1000,
                                        ).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </TableCard>
    );
}
