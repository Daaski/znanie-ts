import { GetStaticPaths, GetStaticProps } from 'next';
import ky from 'ky';

import { Lector } from 'components/Lector';
import { Layout } from 'components/Layout/Layout';
import { LectorType } from 'lib/types/lectors';

const LectorPage = ({ lector }: LectorType) => {
    return (
        <Layout>
            <Lector {...lector} />
        </Layout>
    );
};

export default LectorPage;

export const getStaticPaths: GetStaticPaths = async (lector) => {
    const res = await ky
        .get(process.env.NEXT_PUBLIC_API_URL + 'api/users/lectors')
        .json();
    const paths = res.map((lector) => ({
        params: { pk: lector.pk.toString() },
    }));
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { pk } = context.params;
    const res: Promise<LectorType> = await ky
        .get(process.env.NEXT_PUBLIC_API_URL + 'api/users/lectors/' + pk)
        .json();
    return {
        props: { lector: res },
        revalidate: 60,
    };
};
