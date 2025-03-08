'use client';

import { ModuleContainer } from '@/components/containers/Container';
import BookAppointmentComponent from '@/components/family-clinic/book-appointment/BookAppointmentComponent';
import { useParams, useRouter } from 'next/navigation';
import { parseFamilyClinicIdFromUrlParams } from '@/utils/familyClinicUtils';

export default function BookAppointment() {
    const params = useParams();
    const router = useRouter();
    const familyClinicId = parseFamilyClinicIdFromUrlParams(params);

    return (
        <ModuleContainer>
            <BookAppointmentComponent
                onExit={() => router.push(`/family-clinic/${familyClinicId}`)}
            />
        </ModuleContainer>
    );
}
