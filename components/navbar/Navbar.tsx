'use client';

import { AppBar, Toolbar } from '@mui/material';
import Image from 'next/image';
import { LogoContainer } from '@/components/navbar/styles';
import { useParams, useRouter } from 'next/navigation';
import { parseClinicIdFromUrlParams } from '@/utils/paramUtils';

export default function Navbar() {
    const router = useRouter();
    const params = useParams();
    const familyClinicId = parseClinicIdFromUrlParams(params);
    return (
        <AppBar position="sticky" color="secondary" elevation={1}>
            <Toolbar>
                <LogoContainer
                    onClick={() => {
                        if (familyClinicId) {
                            router.push(`/family-clinic/${familyClinicId}`);
                        }
                    }}
                >
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
