'use client';

import { useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import Loading from '@/components/loading/Loading';

interface UnAuthGuardProps {
    children: React.ReactNode;
    reroute?: string;
}

const UnAuthGuard = ({ children, reroute = '/' }: UnAuthGuardProps) => {
    const { isAuthed, isInitialized } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isInitialized && isAuthed) {
            router.push(reroute || '/');
        }
    }, [isAuthed, reroute, router]);

    if (isAuthed || !isInitialized) {
        return <Loading />;
    }

    return children;
};

export default UnAuthGuard;
