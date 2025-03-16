'use client';

import { useForm } from 'react-hook-form';
import { useLogin } from '@/hooks/users/useLogin';
import { useRouter, useParams } from 'next/navigation';
import { useToaster } from '@/providers/ToasterProvider';
import { Typography, TextField, Button } from '@mui/material';
import { ModuleContainer } from '@/components/containers/Container';
import { LoginRequest } from '@/types/authentication';
import {
    ButtonContainer,
    LoginCard,
    LoginContainer,
} from '@/app/family-clinic/[family-clinic-id]/admin/login/styles';
import { useFamilyClinicInfo } from '@/hooks/family_clinic/useFamilyClinicInfo';
import { parseFamilyClinicIdFromUrlParams } from '@/utils/familyClinicUtils';
import Loading from '@/components/loading/Loading';
import ErrorScreen from '@/components/screens/ErrorScreen';

export default function AdminLogin() {
    const router = useRouter();
    const { setToaster } = useToaster();
    const params = useParams();
    const familyClinicId = parseFamilyClinicIdFromUrlParams(params);
    const { data: clinic, isLoading, error } = useFamilyClinicInfo(familyClinicId);

    const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>();

    const onSubmit = (data: LoginRequest) => {
        loginMutation.mutate(data, {
            onSuccess: () => {
                setToaster('Login successful!', 'success');
                // TLDR: fix to prevent rapid inputs + server call + router push causeing browser tab crash
                // spent too long on this to think of another solution tbh
                setTimeout(() => {
                    router.push(`/family-clinic/${familyClinicId}/admin/dashboard`);
                }, 0);
            },
            onError: () => {
                setToaster('Invalid credentials. Please try again.', 'error');
            },
        });
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error || !clinic) {
        return <ErrorScreen message="Error loading clinic information." />;
    }

    return (
        <ModuleContainer>
            <LoginContainer>
                <Typography variant="h1" gutterBottom>
                    {clinic.name}
                </Typography>
                <LoginCard>
                    <Typography variant="h3" gutterBottom>
                        Admin Login
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        {loginMutation.isError && (
                            <Typography color="error" variant="body2">
                                Invalid credentials. Please try again.
                            </Typography>
                        )}
                        <ButtonContainer>
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                onClick={() => router.push(`/family-clinic/${familyClinicId}`)}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                disabled={loginMutation.isPending}
                            >
                                {loginMutation.isPending ? 'Logging in...' : 'Login'}
                            </Button>
                        </ButtonContainer>
                    </form>
                </LoginCard>
            </LoginContainer>
        </ModuleContainer>
    );
}
