import { Layout } from 'components/Layout/Layout';
import { Profile } from 'components/Profile';
import { isAuth } from 'components/HOC/isAuth';

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

export async function getServerSideProps(context) {
    const slug = context.params.slug;

    if (!allowedPaths.includes(slug)) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            slug,
        },
    };
}
