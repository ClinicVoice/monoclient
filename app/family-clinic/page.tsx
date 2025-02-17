'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/loading/Loading';
import { ModuleContainer } from '@/components/containers/Container';

// TODO: in the future, this will become a catalog to select between many family clinics
export default function FamilyClinicCatalog() {
    const router = useRouter();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            router.push('/family-clinic/1');
        }
    }, [router]);

    return (
        <ModuleContainer>
            <Loading />
        </ModuleContainer>
    );
}
