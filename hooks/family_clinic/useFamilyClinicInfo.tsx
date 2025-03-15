import { useQuery } from '@tanstack/react-query';
import { FamilyClinicConfig } from '@/types/family_clinic/family_clinic';
import { getFamilyClinicInfo } from '@/services/familyClinicService';

export const useFamilyClinicInfo = (familyClinicId: string) => {
    return useQuery<FamilyClinicConfig>({
        queryKey: ['familyClinicInfo', familyClinicId],
        queryFn: () => getFamilyClinicInfo(familyClinicId),
    });
};
