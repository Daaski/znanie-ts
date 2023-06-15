import axios from 'axios';
import * as process from 'process';

export const $host = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    proxy: {
        host: 'http://51.250.80.71',
        port: 8080
    }
});


export const $auth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    proxy: {
        host: 'http://51.250.80.71',
        port: 8080
    }
});

$auth.interceptors.request.use(res => {
    res.headers.set('Authorization', `Bearer ${localStorage.getItem('access')}`)
    return res
})

