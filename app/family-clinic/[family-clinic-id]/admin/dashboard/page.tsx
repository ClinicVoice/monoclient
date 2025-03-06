'use client';

import { useParams, useRouter } from 'next/navigation';
import { Typography, Button, Box } from '@mui/material';
import LogoutButton from '@/components/buttons/LogoutButton';
import {
    DashboardContainer,
    ButtonContainer,
} from '@/app/family-clinic/[family-clinic-id]/admin/dashboard/styles';
import { useFamilyClinicInfo } from '@/hooks/family_clinic/useFamilyClinicInfo';
import Loading from '@/components/loading/Loading';
import ErrorScreen from '@/components/screens/ErrorScreen';
import { parseFamilyClinicIdFromUrlParams } from '@/utils/familyClinicUtils';
import { AppointmentRecordRequestsCalendarView } from '@/components/family-clinic/admin/AppointmentRecordRequestsCalendarView/AppointmentRecordRequestsCalendarView';

export default function AdminDashboard() {
    const params = useParams();
    const familyClinicId = parseFamilyClinicIdFromUrlParams(params);
    const router = useRouter();
    const { data: clinic, isLoading, error } = useFamilyClinicInfo(familyClinicId);

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

            <AppointmentRecordRequestsCalendarView />
        </DashboardContainer>
    );
}
