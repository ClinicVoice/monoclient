'use client';

import { Container, Typography, Paper, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { ModuleContainer } from '@/components/containers/Container';

const InfoCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    width: '100%',
    maxWidth: 600,
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
}));

export default function FamilyClinicHomePage() {
    const router = useRouter();

    return (
        <ModuleContainer>
            <Typography variant="h1" gutterBottom>
                Greenleaf Family Clinic
            </Typography>
            <Typography variant="h3" gutterBottom>
                Dr. John Doe
            </Typography>

            <InfoCard>
                <Typography variant="body1">
                    <strong>Address:</strong> 123 Health St, Toronto, ON
                </Typography>
                <Typography variant="body1">
                    <strong>Phone:</strong> (123) 456-7890
                </Typography>
                <Typography variant="body1">
                    <strong>Email:</strong> contact@greenleafclinic.com
                </Typography>
                <Typography variant="body1" mt={2}>
                    <strong>Opening Hours:</strong>
                </Typography>
                <Typography variant="body2">Monday - Friday: 9 AM - 5 PM</Typography>
                <Typography variant="body2">Saturday: 10 AM - 3 PM</Typography>
                <Typography variant="body2">Sunday: Closed</Typography>

                <Grid container spacing={2} mt={4} justifyContent="center">
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => router.push('/family-clinic/book-appointment')}
                        >
                            Book an Appointment
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={() => router.push('/family-clinic/admin-login')}
                        >
                            Admin Login
                        </Button>
                    </Grid>
                </Grid>
            </InfoCard>
        </ModuleContainer>
    );
}
