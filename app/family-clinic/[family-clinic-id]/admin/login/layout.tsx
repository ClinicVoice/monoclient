'use client';

import UnAuthGuard from '@/components/guards/UnAuthGuard';
import { useParams } from 'next/navigation';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const params = useParams();
    const familyClinicId = params['family-clinic-id'];

    return (
        <UnAuthGuard reroute={`/family-clinic/${familyClinicId}/admin/dashboard`}>
            {children}
        </UnAuthGuard>
    );
}
