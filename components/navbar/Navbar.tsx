'use client';

import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';

const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

export default function Navbar() {
    return (
        <AppBar position="sticky" color="default" elevation={1}>
            <Toolbar>
                <LogoContainer>
                    <Image src="/logo.png" alt="Company Logo" width={40} height={40} />
                    <Typography
                        variant="h2"
                        component={Link}
                        href="/"
                        sx={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        ClinicVoice AI
                    </Typography>
                </LogoContainer>
            </Toolbar>
        </AppBar>
    );
}
