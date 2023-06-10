import { Layout } from 'components/Layout/Layout';
import { Profile } from 'components/Profile';
import { isAuth } from 'components/HOC/isAuth';

const ProfilePage = () => {
    return (
        <Layout>
            <Profile />
        </Layout>
    );
};

export default isAuth(ProfilePage);
