import axios from 'axios';
import * as process from 'process';

export const $host = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
});


export const $auth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
});

$auth.interceptors.request.use(res => {
    res.headers.set('Authorization', `Bearer ${localStorage.getItem('access')}`)
    return res
})

