import { GetStaticPaths, GetStaticProps } from 'next';

import { Lector } from 'components/Lector';
import { Layout } from 'components/Layout/Layout';
import { LectorType } from 'http/types';
import { getFilterLectors, getLector } from 'http/lectorsApi';

interface LectorPageProps {
    lector: LectorType;
}

const LectorPage = ({ lector }: LectorPageProps) => {
    return (
        <Layout>
            <Lector {...lector} />
        </Layout>
    );
};

export default LectorPage;

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await getFilterLectors();
    const paths = res.map((lector) => ({
        params: { pk: lector.pk.toString() },
    }));
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<{ lector: LectorType }> = async (
    ctx
) => {
    const pk = ctx.params?.pk;

    try {
        if (!pk) {
            throw new Error('Не найдено');
        }
        const res = await getLector(pk as string);
        return Promise.resolve({
            props: { lector: res },
            revalidate: 60,
        });
    } catch (e) {
        return Promise.resolve({
            notFound: true,
        });
    }
};
