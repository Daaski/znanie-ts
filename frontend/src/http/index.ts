import axios from 'axios';
import * as process from 'process';

export const $host = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});


export const $auth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

$auth.interceptors.request.use(res => {
    res.headers.set('Authorization', `Bearer ${localStorage.getItem('access')}`)
    return res
})

