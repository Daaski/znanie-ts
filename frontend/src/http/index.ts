import ky from 'ky';
import * as process from 'process';

export const $host = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_URL,
    hooks: {
        beforeRequest: [
            (request) => {
                corsInterceptor(request)
            }
        ]
    }
});

const corsInterceptor = (request: Request) => {
    request.headers.set(
        'Origin',
        'http://51.250.80.71:3000'
    )
}

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
                corsInterceptor(request)
            },
        ],
    },
});
