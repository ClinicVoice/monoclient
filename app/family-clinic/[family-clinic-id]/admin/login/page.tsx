'use client';

import { Container, Typography, Paper, TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ModuleContainer } from '@/components/containers/Container';

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
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const router = useRouter();
    const params = useParams();
    const familyClinicId = params['family-clinic-id'];

    const handleLogin = () => {
        router.push(`/family-clinic/${familyClinicId}/admin/dashboard`);
    };

    const handleBack = () => {
        router.push('/');
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
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Username"
                        value={credentials.username}
                        onChange={(e) =>
                            setCredentials({ ...credentials, username: e.target.value })
                        }
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        value={credentials.password}
                        onChange={(e) =>
                            setCredentials({ ...credentials, password: e.target.value })
                        }
                    />
                    <ButtonContainer>
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                            Login
                        </Button>
                    </ButtonContainer>
                </LoginCard>
            </LoginContainer>
        </ModuleContainer>
    );
}
