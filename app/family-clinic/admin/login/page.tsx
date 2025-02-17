'use client';

import { Container, Typography, Paper, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default function AdminLogin() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const router = useRouter();

    const handleLogin = () => {
        router.push('/family-clinic/admin-dashboard');
    };

    return (
        <ModuleContainer>
            <LoginContainer>
                <Typography variant="h1" gutterBottom>
                    Admin Login
                </Typography>
                <LoginCard>
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
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </LoginCard>
            </LoginContainer>
        </ModuleContainer>
    );
}
