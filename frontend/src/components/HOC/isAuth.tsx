import { useUserStore } from 'store/UserStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// eslint-disable-next-line react/display-name
export const isAuth =
    // eslint-disable-next-line react/display-name
    (WrappedComponent: React.FC) => (props: React.ComponentProps<any>) => {
        const [user] = useUserStore((state) => [state.user]);
        const router = useRouter();

        useEffect(() => {
            if (!user.isAuth) {
                router.replace('/').then();
            }
        }, []);

        return <WrappedComponent {...props} />;
    };
