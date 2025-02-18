'use client';

import { useParams, useRouter } from 'next/navigation';
import { Typography, Button } from '@mui/material';
import LogoutButton from '@/components/buttons/LogoutButton';
import RecentAppointmentRecordRequestsTable from '@/components/family-clinic/admin/RecentAppointmentRecordRequestsTable';
import AppointmentRecordRequestsByDateTable from '@/components/family-clinic/admin/AppointmentRecordRequestsByDateTable';
import {
    DashboardContainer,
    ButtonContainer,
} from '@/app/family-clinic/[family-clinic-id]/admin/dashboard/styles';

export default function AdminDashboard() {
    const params = useParams();
    const familyClinicId = params['family-clinic-id'];
    const router = useRouter();

    return (
        <DashboardContainer>
            <Typography variant="h1" gutterBottom>
                Greenleaf Family Clinic
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
        </DashboardContainer>
    );
}
