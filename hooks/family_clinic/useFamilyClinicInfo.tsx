import { useQuery } from '@tanstack/react-query';
import { FamilyClinic } from '@/types/family_clinic/family_clinic';
import { getFamilyClinicInfo } from '@/services/familyClinicService';

export const useFamilyClinicInfo = (familyClinicId: string) => {
    return useQuery<FamilyClinic>({
        queryKey: ['familyClinicInfo', familyClinicId],
        queryFn: () => getFamilyClinicInfo(familyClinicId),
    });
};
