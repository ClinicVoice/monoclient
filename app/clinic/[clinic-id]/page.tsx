'use client';

import React from 'react';
import { Typography, Grid, Button, Divider, Box } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { ModuleContainer } from '@/components/containers/Container';
import { InfoCard } from '@/app/clinic/[clinic-id]/styles';
import { useClinic } from '@/hooks/clinics/useClinic';
import Loading from '@/components/loading/Loading';
import { parseClinicIdFromUrlParams } from '@/utils/paramUtils';
import ErrorScreen from '@/components/screens/ErrorScreen';
import ClinicOpeningHoursDisplay from '@/components/clinic/ClinicOpeningHoursDisplay';

export default function ClinicHomePage() {
    const router = useRouter();
    const params = useParams();
    const clinicId = parseClinicIdFromUrlParams(params);
    const { data: clinic, isLoading, error } = useClinic(clinicId);

    if (isLoading) {
        return <Loading />;
    }

    if (error || !clinic) {
        return <ErrorScreen message="Error loading clinic information." />;
    }

    return (
        <ModuleContainer>
            <InfoCard>
                <Typography variant="h1" gutterBottom align="center">
                    {clinic.name}
                </Typography>

                <Divider />

                <Box marginY={2}>
                    <Typography variant="body1">
                        <strong>Address:</strong> {clinic.address}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Phone:</strong> {clinic.phone}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Email:</strong> {clinic.email}
                    </Typography>
                    <ClinicOpeningHoursDisplay clinicId={clinic.id} />
                </Box>

                <Divider />

                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => router.push(`/clinic/${clinicId}/book-appointment`)}
                        >
                            Book an Appointment
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={() => router.push(`/clinic/${clinicId}/admin/dashboard`)}
                        >
                            Admin Dashboard
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={() => router.push('/clinic')}
                        >
                            Back to Catalog
                        </Button>
                    </Grid>
                </Grid>
            </InfoCard>
        </ModuleContainer>
    );
}
