'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Typography, Button, Box, Divider } from '@mui/material';
import LogoutButton from '@/components/buttons/LogoutButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { DashboardContainer } from '@/app/clinic/[clinic-id]/admin/dashboard/styles';
import { useClinic } from '@/hooks/clinics/useClinic';
import Loading from '@/components/loading/Loading';
import ErrorScreen from '@/components/screens/ErrorScreen';
import { parseClinicIdFromUrlParams } from '@/utils/paramUtils';
import { AppointmentsForDoctorCalendarView } from '@/components/clinic/admin/AppointmentsForDoctorCalendarView/AppointmentsForDoctorCalendarView';
import ResultRequestsTable from '@/components/clinic/admin/ResultRequestsTable';

export default function AdminDashboard() {
    const params = useParams();
    const clinicId = parseClinicIdFromUrlParams(params);
    const router = useRouter();
    const { data: clinic, isLoading, error } = useClinic(clinicId);

    if (isLoading) {
        return <Loading />;
    }

    if (error || !clinic) {
        return <ErrorScreen message="Error loading clinic information." />;
    }

    return (
        <DashboardContainer>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    alignItems: 'center',
                    width: '100%',
                    mb: 2,
                }}
            >
                <Box sx={{ textAlign: 'left' }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => router.push(`/clinic/${clinicId}`)}
                    >
                        Back to Home
                    </Button>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h1" gutterBottom>
                        {clinic.name}
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                        Admin Portal
                    </Typography>
                </Box>
                <Box
                    sx={{
                        textAlign: 'right',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 1,
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<SettingsIcon />}
                        onClick={() => router.push(`/clinic/${clinicId}/admin/dashboard/settings`)}
                    >
                        Settings
                    </Button>
                    <LogoutButton redirectTo={`/clinic/${clinicId}`} />
                </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Divider
                    sx={{
                        borderWidth: '10',
                        width: '95vw',
                    }}
                />
            </Box>

            <AppointmentsForDoctorCalendarView />

            <Box sx={{ mb: 4 }}>
                <Divider
                    sx={{
                        borderWidth: '10',
                        width: '90vw',
                    }}
                />
            </Box>

            <ResultRequestsTable />
        </DashboardContainer>
    );
}
