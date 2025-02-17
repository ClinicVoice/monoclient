'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/loading/Loading';
import { ModuleContainer } from '@/components/containers/Container';

export default function Entry() {
    const router = useRouter();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            router.push('/family-clinic');
        }
    }, [router]);

    return (
        <ModuleContainer>
            <Loading />
        </ModuleContainer>
    );
}
