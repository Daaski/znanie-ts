import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import NProgress from 'nprogress';
import { Spinner } from 'components/UI/Spinner/Spinner';
import { useEffect, useState } from 'react';
import { setFullUser } from 'lib/setFullUser';
import { useUserStore } from 'store/UserStore';

import 'sccs/globals.scss';
import 'sccs/_reset.scss';

export default function App({ Component, pageProps }: AppProps) {
    const [setUser] = useUserStore((state) => [state.setUser]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        NProgress.start();
        setFullUser(setUser).then(() => {
            setLoading(false);
            NProgress.done();
        });
    }, [setUser]);

    if (loading) {
        return <Spinner />;
    }

    return <Component {...pageProps} />;
}
