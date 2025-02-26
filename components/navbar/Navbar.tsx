'use client';

import { AppBar, Toolbar } from '@mui/material';
import Image from 'next/image';
import { LogoContainer } from '@/components/navbar/styles';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    return (
        <AppBar position="sticky" color="secondary" elevation={1}>
            <Toolbar>
                <LogoContainer onClick={() => router.push('/')}>
                    <Image
                        src="/assets/logos/light_logo_brand.png"
                        alt="Company Logo"
                        height={60}
                        width={240}
                    />
                </LogoContainer>
            </Toolbar>
        </AppBar>
    );
}
