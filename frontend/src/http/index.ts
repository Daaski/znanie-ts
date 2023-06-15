import ky from 'ky';
import * as process from 'process';

export const $host = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_URL + '/',
});


const authInterceptor = (request: Request) => {
    request.headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('access')}`
    );
};

export const $auth = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_URL,
    hooks: {
        beforeRequest: [
            (request) => {
                authInterceptor(request);
            },
        ],
    },
});
