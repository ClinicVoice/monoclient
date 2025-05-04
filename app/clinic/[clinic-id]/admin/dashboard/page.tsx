'use client';

import React, { useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Typography, Button, Box, Divider, Grid } from '@mui/material';
import LogoutButton from '@/components/buttons/LogoutButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { DashboardContainer } from '@/app/clinic/[clinic-id]/admin/dashboard/styles';
import { useClinic } from '@/hooks/clinics/useClinic';
import Loading from '@/components/loading/Loading';
import ErrorScreen from '@/components/screens/ErrorScreen';
import { parseClinicIdFromUrlParams } from '@/utils/paramUtils';
import { AppointmentsForDoctorCalendarView } from '@/components/clinic/admin/AppointmentsForDoctorCalendarView/AppointmentsForDoctorCalendarView';
import { ResultRequestsTable } from '@/components/clinic/admin/ResultRequestsTable';

export default function AdminDashboard() {
    const params = useParams();
    const clinicId = parseClinicIdFromUrlParams(params);
    const router = useRouter();
    const { data: clinic, isLoading, error } = useClinic(clinicId);
    const appointmentsRef = useRef<HTMLDivElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

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
                    <LogoutButton redirectTo={`/clinic/${clinicId}`} />
                </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Divider sx={{ borderWidth: 1, width: '95vw' }} />
            </Box>

            <Box sx={{ mb: 4 }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                                router.push(`/clinic/${clinicId}/admin/dashboard/doctors`)
                            }
                        >
                            Manage Doctors
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                                router.push(`/clinic/${clinicId}/admin/dashboard/patients`)
                            }
                        >
                            Manage Patients
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                                router.push(`/clinic/${clinicId}/admin/dashboard/settings`)
                            }
                        >
                            Manage Settings
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={() =>
                                appointmentsRef.current?.scrollIntoView({ behavior: 'smooth' })
                            }
                        >
                            View Scheduled Appointments
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={() =>
                                resultsRef.current?.scrollIntoView({ behavior: 'smooth' })
                            }
                        >
                            View Result Requests
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Divider sx={{ borderWidth: 1, width: '95vw' }} />
            </Box>

            <AppointmentsForDoctorCalendarView ref={appointmentsRef} />

            <Box sx={{ mb: 4 }}>
                <Divider sx={{ borderWidth: 1, width: '95vw' }} />
            </Box>

            <ResultRequestsTable ref={resultsRef} />
        </DashboardContainer>
    );
}
