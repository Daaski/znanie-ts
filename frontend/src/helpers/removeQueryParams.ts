import { NextRouter } from 'next/router';

export const removeQueryParam = (param: string, router: NextRouter) => {
    const { pathname, query } = router;
    const params = new URLSearchParams(query as Record<string, string>);
    params.delete(param);
    router.replace({ pathname, query: params.toString() }, undefined).then();
};
