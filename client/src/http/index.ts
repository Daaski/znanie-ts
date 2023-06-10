import ky from 'ky';

export const $host = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_URL,
});

const authInterceptor = (request) => {
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
