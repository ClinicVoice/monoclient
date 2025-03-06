'use client';

import { useParams, useRouter } from 'next/navigation';
import { Typography, Button, Box } from '@mui/material';
import LogoutButton from '@/components/buttons/LogoutButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { DashboardContainer } from '@/app/family-clinic/[family-clinic-id]/admin/dashboard/styles';
import { useFamilyClinicInfo } from '@/hooks/family_clinic/useFamilyClinicInfo';
import Loading from '@/components/loading/Loading';
import ErrorScreen from '@/components/screens/ErrorScreen';
import { parseFamilyClinicIdFromUrlParams } from '@/utils/familyClinicUtils';
import { AppointmentRecordRequestsCalendarView } from '@/components/family-clinic/admin/AppointmentRecordRequestsCalendarView/AppointmentRecordRequestsCalendarView';
import RecentTestResultsRequestsTable from '@/components/family-clinic/admin/RecentTestResultsRequestsTable';

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
                        onClick={() => router.push(`/family-clinic/${familyClinicId}`)}
                    >
                        Back to Home
                    </Button>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h1" gutterBottom>
                        {clinic.name}
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                        Admin Dashboard
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
                        onClick={() =>
                            router.push(`/family-clinic/${familyClinicId}/admin/dashboard/settings`)
                        }
                    >
                        Settings
                    </Button>
                    <LogoutButton redirectTo={`/family-clinic/${familyClinicId}`} />
                </Box>
            </Box>

            <AppointmentRecordRequestsCalendarView />

            <RecentTestResultsRequestsTable />
        </DashboardContainer>
    );
}
