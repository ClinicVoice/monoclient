'use client';

import { Typography, Grid, Button, Divider, Box } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { ModuleContainer } from '@/components/containers/Container';
import { InfoCard } from '@/app/family-clinic/[family-clinic-id]/styles';
import { useFamilyClinicInfo } from '@/hooks/family_clinic/useFamilyClinicInfo';
import Loading from '@/components/loading/Loading';
import { parseFamilyClinicIdFromUrlParams } from '@/utils/familyClinicUtils';
import ErrorScreen from '@/components/screens/ErrorScreen';
import FamilyClinicOpeningHoursDisplay from '@/components/family-clinic/FamilyClinicOpeningHoursDisplay';

export default function FamilyClinicHomePage() {
    const router = useRouter();
    const params = useParams();
    const familyClinicId = parseFamilyClinicIdFromUrlParams(params);
    const { data: clinic, isLoading, error } = useFamilyClinicInfo(familyClinicId);

    if (isLoading) {
        return <Loading />;
    }

    if (error || !clinic) {
        return <ErrorScreen message="Error loading clinic information." />;
    }

    return (
        <ModuleContainer>
            <InfoCard>
                <Typography variant="h1" gutterBottom>
                    {clinic.name}
                </Typography>
                <Typography variant="h3" gutterBottom>
                    {clinic.doctorName}
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
                    <FamilyClinicOpeningHoursDisplay openingHours={clinic.openingHours} />
                </Box>

                <Divider />

                <Grid container spacing={2} mt={0} justifyContent="center">
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() =>
                                router.push(`/family-clinic/${familyClinicId}/book-appointment`)
                            }
                        >
                            Book an Appointment
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={() =>
                                router.push(`/family-clinic/${familyClinicId}/admin/dashboard`)
                            }
                        >
                            Admin Dashboard
                        </Button>
                    </Grid>
                </Grid>
            </InfoCard>
        </ModuleContainer>
    );
}
