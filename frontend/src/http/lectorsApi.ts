import * as T from './types';
import { $host } from 'http/index';

export const getFilterLectors: T.GetFilterLectors = async (q) => {
    q = q?.toLowerCase();
    const res = await $host.get(`/api/users/lectors/?surname=${q}`);
    return res.data
};

export const getFilterLectorsFullName: T.GetFilterFullNameLectors = async (
    fullname
) => {
    fullname = fullname?.toLowerCase();
    const res = await $host.get(`/api/users/lectors/?fullname=${fullname}`);
    return res.data
};

export const getLector: T.GetLector = async (id) => {
    const res =await $host.get(`/api/users/lectors/${id}/`)
    return res.data
}