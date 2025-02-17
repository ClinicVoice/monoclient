'use client';

import AuthGuard from '@/components/guards/AuthGuard';
import { useParams } from 'next/navigation';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const params = useParams();
    const familyClinicId = params['family-clinic-id'];

    return (
        <AuthGuard reroute={`/family-clinic/${familyClinicId}/admin/login`}>{children}</AuthGuard>
    );
}
