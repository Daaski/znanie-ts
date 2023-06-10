import { NextRouter } from 'next/router';

export const removeQueryParam = (param, router: NextRouter) => {
    const { pathname, query } = router;
    const params = new URLSearchParams(query);
    params.delete(param);
    router.replace({ pathname, query: params.toString() }, undefined);
};
