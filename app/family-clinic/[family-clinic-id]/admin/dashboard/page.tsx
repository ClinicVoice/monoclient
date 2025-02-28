'use client';

import { useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Typography, Button, Box } from '@mui/material';
import LogoutButton from '@/components/buttons/LogoutButton';
import RecentAppointmentRecordRequestsTable from '@/components/family-clinic/admin/RecentAppointmentRecordRequestsTable';
import AppointmentRecordRequestsByDateTable from '@/components/family-clinic/admin/AppointmentRecordRequestsByDateTable';
import RecentTestResultsRequestsTable from '@/components/family-clinic/admin/RecentTestResultsRequestsTable';
import {
    DashboardContainer,
    ButtonContainer,
} from '@/app/family-clinic/[family-clinic-id]/admin/dashboard/styles';
import { useFamilyClinicInfo } from '@/hooks/family_clinic/useFamilyClinicInfo';
import Loading from '@/components/loading/Loading';
import ErrorScreen from '@/components/screens/ErrorScreen';
import { parseFamilyClinicIdFromUrlParams } from '@/utils/familyClinicUtils';

export default function AdminDashboard() {
    const params = useParams();
    const familyClinicId = parseFamilyClinicIdFromUrlParams(params);
    const router = useRouter();
    const { data: clinic, isLoading, error } = useFamilyClinicInfo(familyClinicId);

    const recentAppointmentsRef = useRef(null);
    const appointmentsByDateRef = useRef(null);
    const recentTestResultsRef = useRef(null);

    const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error || !clinic) {
        return <ErrorScreen message="Error loading clinic information." />;
    }

    return (
        <DashboardContainer>
            <Typography variant="h1" gutterBottom>
                {clinic.name}
            </Typography>

            <Typography variant="h3" gutterBottom>
                Admin Dashboard
            </Typography>

            <ButtonContainer>
                <Button variant="contained" color="secondary" onClick={() => router.push('/')}>
                    Back to Home
                </Button>
                <LogoutButton redirectTo={`/family-clinic/${familyClinicId}`} />
            </ButtonContainer>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                        variant="contained"
                        onClick={() => scrollToSection(recentAppointmentsRef)}
                    >
                        Recent Appointment Requests
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => scrollToSection(appointmentsByDateRef)}
                    >
                        Appointment Requests by Date
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => scrollToSection(recentTestResultsRef)}
                    >
                        Recent Test Results Requests
                    </Button>
                </Box>
            </Box>

            <Box ref={recentAppointmentsRef}>
                <RecentAppointmentRecordRequestsTable />
            </Box>

            <Box ref={appointmentsByDateRef} mt={4}>
                <AppointmentRecordRequestsByDateTable />
            </Box>

            <Box ref={recentTestResultsRef} mt={4}>
                <RecentTestResultsRequestsTable />
            </Box>
        </DashboardContainer>
    );
}
