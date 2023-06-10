import { useUserStore } from 'store/UserStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// eslint-disable-next-line react/display-name
export const isAuth = (WrappedComponent) => (props) => {
    const [user] = useUserStore((state) => [state.user]);
    const router = useRouter();

    useEffect(() => {
        if (!user.isAuth) {
            router.replace('/');
        }
    }, []);

    return <WrappedComponent {...props} />;
};
