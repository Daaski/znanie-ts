import { Layout } from 'components/Layout/Layout';
import { Profile } from 'components/Profile';
import { isAuth } from 'components/HOC/isAuth';
import { GetServerSideProps } from 'next';

const allowedPaths = [
    'main',
    'about',
    'likes',
    'favorites',
    'events-dashboard',
];

const ProfilePageWithParams = () => {
    return (
        <Layout>
            <Profile />
        </Layout>
    );
};

export default isAuth(ProfilePageWithParams);

export const getServerSideProps: GetServerSideProps<{ slug: string }> = async (
    ctx
) => {
    const slug = ctx.params?.slug as string;

    if (slug) {
        if (!allowedPaths.includes(slug)) {
            return {
                notFound: true,
            };
        }
    }

    return {
        props: {
            slug,
        },
    };
};
