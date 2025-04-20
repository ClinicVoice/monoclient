'use client';

import { ModuleContainer } from '@/components/containers/Container';
import BookAppointmentComponent from '@/components/forms/book-appointment/BookAppointmentComponent';
import { useParams, useRouter } from 'next/navigation';
import { parseClinicIdFromUrlParams } from '@/utils/paramUtils';

export default function BookAppointment() {
    const params = useParams();
    const router = useRouter();
    const clinicId = parseClinicIdFromUrlParams(params);

    return (
        <ModuleContainer>
            <BookAppointmentComponent onExit={() => router.push(`/clinic/${clinicId}`)} />
        </ModuleContainer>
    );
}
