'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/loading/Loading';
import { ModuleContainer } from '@/components/containers/Container';

// TODO: in the future, this will become a catalog to select between many service domains
export default function Entry() {
    const router = useRouter();
    useEffect(() => {
        router.push('/clinic');
    }, [router]);

    return (
        <ModuleContainer>
            <Loading />
        </ModuleContainer>
    );
}
