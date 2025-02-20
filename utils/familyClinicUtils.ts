export const parseFamilyClinicIdFromUrlParams = (
    params: Record<string, string | string[]>,
): string => {
    const param = params['family-clinic-id'];
    return Array.isArray(param) ? param[0] : param || '';
};
