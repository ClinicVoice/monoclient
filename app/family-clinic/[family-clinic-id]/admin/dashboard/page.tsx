'use client';

import { useParams, useRouter } from 'next/navigation';
import { Typography, Button } from '@mui/material';
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

            <RecentAppointmentRecordRequestsTable />

            <AppointmentRecordRequestsByDateTable />

            <RecentTestResultsRequestsTable />
        </DashboardContainer>
    );
}
