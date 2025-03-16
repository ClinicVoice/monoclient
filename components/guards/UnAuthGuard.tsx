'use client';

import { useEffect, ReactNode } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import Loading from '@/components/loading/Loading';

interface UnAuthGuardProps {
    children: ReactNode;
    reroute?: string;
}

const UnAuthGuard = ({ children, reroute = '/' }: UnAuthGuardProps) => {
    const { isAuthed, isInitialized } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isInitialized && isAuthed) {
            router.refresh();
        }
    }, [isInitialized, isAuthed, reroute, router]);

    if (isAuthed || !isInitialized) {
        return <Loading />;
    }

    return children;
};

export default UnAuthGuard;
