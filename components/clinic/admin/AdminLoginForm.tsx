'use client';

import { useForm, Controller } from 'react-hook-form';
import { useLogin } from '@/hooks/authentication/useLogin';
import { useRouter } from 'next/navigation';
import { useToaster } from '@/providers/ToasterProvider';
import { TextField, Button, Typography } from '@mui/material';
import { ButtonContainer, LoginCard } from '@/app/clinic/[clinic-id]/admin/login/styles';
import { LoginRequest } from '@/types/authentication';

interface AdminLoginFormProps {
    familyClinicId: string;
}

export const AdminLoginForm = ({ familyClinicId }: AdminLoginFormProps) => {
    const router = useRouter();
    const { setToaster } = useToaster();
    const loginMutation = useLogin();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (data: LoginRequest) => {
        loginMutation.mutate(data, {
            onSuccess: () => {
                setTimeout(() => {
                    router.push(`/family-clinic/${familyClinicId}/admin/dashboard`);
                }, 0);
            },
            onError: () => {
                setToaster('Invalid credentials. Please try again.', 'error');
            },
        });
    };

    return (
        <LoginCard>
            <Typography variant="h3" gutterBottom>
                Admin Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: 'Email is required' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            margin="normal"
                            label="Email"
                            type="email"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    rules={{ required: 'Password is required' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            margin="normal"
                            label="Password"
                            type="password"
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    )}
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
    );
};
