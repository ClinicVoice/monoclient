'use client';

import { useParams } from 'next/navigation';
import { Typography } from '@mui/material';
import { ModuleContainer } from '@/components/containers/Container';
import { useFamilyClinicInfo } from '@/hooks/family_clinic/useFamilyClinicInfo';
import { parseClinicIdFromUrlParams } from '@/utils/paramUtils';
import Loading from '@/components/loading/Loading';
import ErrorScreen from '@/components/screens/ErrorScreen';
import { LoginContainer } from '@/app/clinic/[clinic-id]/admin/login/styles';
import { AdminLoginForm } from '@/components/clinic/admin/AdminLoginForm';

export default function AdminLogin() {
    const params = useParams();
    const familyClinicId = parseClinicIdFromUrlParams(params);
    const { data: clinic, isLoading, error } = useFamilyClinicInfo(familyClinicId);

    if (isLoading) return <Loading />;
    if (error || !clinic) return <ErrorScreen message="Error loading clinic information." />;

    return (
        <ModuleContainer>
            <LoginContainer>
                <Typography variant="h1" gutterBottom>
                    {clinic.name}
                </Typography>
                <AdminLoginForm familyClinicId={familyClinicId} />
            </LoginContainer>
        </ModuleContainer>
    );
}
