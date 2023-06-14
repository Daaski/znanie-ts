import * as T from './types';
import { $host } from 'http/index';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getFilterLectors: T.GetFilterLectors = async (q) => {
    q = q?.toLowerCase();
    try {
        return await $host.get(`api/users/lectors/?surname=${q}`).json();
    } catch (e: any) {
        console.log(e.message);
    }
};

export const getFilterLectorsFullName: T.GetFilterFullNameLectors = async (
    fullname,
) => {
    fullname = fullname?.toLowerCase();
    return await $host.get(`api/users/lectors/?fullname=${fullname}`).json();
};
