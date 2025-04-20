'use client';

import AuthGuard from '@/components/guards/AuthGuard';
import { useParams } from 'next/navigation';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const params = useParams();
    const familyClinicId = params['clinic-id'];

    return <AuthGuard reroute={`/clinic/${familyClinicId}/admin/login`}>{children}</AuthGuard>;
}
