import * as T from './types';
import { $host } from 'http/index';

export const getFilterLectors: T.GetFilterLectors = async (q) => {
    q = q?.toLowerCase();
    return await $host.get(`/api/users/lectors/?surname=${q}`).json();
};

export const getFilterLectorsFullName: T.GetFilterFullNameLectors = async (
    fullname
) => {
    fullname = fullname?.toLowerCase();
    return await $host.get(`/api/users/lectors/?fullname=${fullname}`).json();
};

export const getLector: T.GetLector = async (id) => {
    return await $host.get(`/api/users/lectors/${id}/`).json()
}