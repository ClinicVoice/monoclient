'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container,
    Typography,
    Paper,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';

const DashboardContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: theme.spacing(6),
}));

const TableCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    width: '100%',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(4),
}));

const ButtonContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 800,
    marginBottom: theme.spacing(2),
}));

const mockAppointments = [
    { id: 1, name: 'John Doe', date: '2025-02-17', time: '10:00 AM', provider: 'Dr. John Doe' },
    { id: 2, name: 'Jane Smith', date: '2025-02-17', time: '11:30 AM', provider: 'Dr. John Doe' },
    { id: 3, name: 'Sam Wilson', date: '2025-02-18', time: '09:45 AM', provider: 'Dr. Jane Doe' },
];

export default function AdminDashboard() {
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const router = useRouter();
    const filteredAppointments = mockAppointments.filter((app) => app.date === selectedDate);

    const exportCSV = () => {
        const csvContent = [
            ['ID', 'Name', 'Date', 'Time', 'Provider'],
            ...mockAppointments.map((app) => [app.id, app.name, app.date, app.time, app.provider]),
        ]
            .map((e) => e.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'appointments.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <DashboardContainer>
            {/* Navigation Buttons */}
            <ButtonContainer>
                <Button variant="contained" color="secondary" onClick={() => router.push('/')}>
                    Back to Home
                </Button>
                <Button variant="contained" color="error" onClick={() => router.push('/login')}>
                    Logout
                </Button>
            </ButtonContainer>

            <Typography variant="h1" gutterBottom>
                Admin Dashboard
            </Typography>

            <TableCard>
                <Typography variant="h3" gutterBottom>
                    Recent Appointments
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Provider</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockAppointments.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell>{app.id}</TableCell>
                                    <TableCell>{app.name}</TableCell>
                                    <TableCell>{app.date}</TableCell>
                                    <TableCell>{app.time}</TableCell>
                                    <TableCell>{app.provider}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="contained" color="primary" onClick={exportCSV} sx={{ mt: 2 }}>
                    Export to CSV
                </Button>
            </TableCard>

            <TableCard>
                <Typography variant="h3" gutterBottom>
                    Appointments by Date
                </Typography>
                <TextField
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Provider</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredAppointments.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell>{app.id}</TableCell>
                                    <TableCell>{app.name}</TableCell>
                                    <TableCell>{app.time}</TableCell>
                                    <TableCell>{app.provider}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button variant="contained" color="primary" onClick={exportCSV} sx={{ mt: 2 }}>
                        Export to CSV
                    </Button>
                </TableContainer>
            </TableCard>
        </DashboardContainer>
    );
}
