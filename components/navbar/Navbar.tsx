'use client';

import { AppBar, Toolbar } from '@mui/material';
import Image from 'next/image';
import { LogoContainer } from '@/components/navbar/styles';
import { useParams, useRouter } from 'next/navigation';
import { parseFamilyClinicIdFromUrlParams } from '@/utils/familyClinicUtils';

export default function Navbar() {
    const router = useRouter();
    const params = useParams();
    const familyClinicId = parseFamilyClinicIdFromUrlParams(params);
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
