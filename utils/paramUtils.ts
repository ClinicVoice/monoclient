export const parseClinicIdFromUrlParams = (params: Record<string, string | string[]>): number => {
    const param = params['clinic-id'];
    const idStr = Array.isArray(param) ? param[0] : param;
    const id = Number(idStr);
    return Number.isNaN(id) ? 1 : id;
};
