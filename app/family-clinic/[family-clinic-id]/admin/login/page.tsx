'use client';

import { useForm } from 'react-hook-form';
import { useLogin } from '@/hooks/users/useLogin';
import { useRouter, useParams } from 'next/navigation';
import { useToaster } from '@/providers/ToasterProvider';
import { Container, Typography, Paper, TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ModuleContainer } from '@/components/containers/Container';
import { LoginRequest } from '@/types/authentication';

const LoginContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: theme.spacing(6),
}));

const LoginCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    width: '100%',
    maxWidth: 400,
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
}));

export default function AdminLogin() {
    const router = useRouter();
    const { setToaster } = useToaster();
    const params = useParams();
    const familyClinicId = params['family-clinic-id'];
    const { setToaster } = useToaster();

    const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>();

    const onSubmit = async (data: LoginRequest) => {
        loginMutation.mutate(data, {
            onSuccess: () => {
                setToaster('Login successful!', 'success');
                router.push(`/family-clinic/${familyClinicId}/admin/dashboard`);
            },
            onError: () => {
                setToaster('Invalid credentials. Please try again.', 'error');
            },
        });
    };

    return (
        <ModuleContainer>
            <LoginContainer>
                <Typography variant="h1" gutterBottom>
                    Greenleaf Family Clinic
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
                                onClick={() => router.push('/')}
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
