import { Params } from 'next/dist/server/request/params';

export const parseClinicIdFromUrlParams = (params: Params): number => {
    const param = params['clinic-id'];
    const idStr = Array.isArray(param) ? param[0] : param;
    const id = Number(idStr);
    return Number.isNaN(id) ? 1 : id;
};
