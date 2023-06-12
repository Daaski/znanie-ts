import { Lectors } from 'components/Lectors';

import { Layout } from 'components/Layout/Layout';
import { GetServerSideProps } from 'next';
import { getFilterLectors } from 'http/lectorsApi';
import { LectorType } from 'http/types';

interface LectorPageProps {
    lectors: LectorType[];
}

const LectorsPage = ({ lectors }: LectorPageProps) => {
    return (
        <Layout
            title="Лекторы Общества Знание"
            description="Список лекторов Общества Знание"
        >
            <Lectors lectors={lectors} />;
        </Layout>
    );
};

export default LectorsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { surname } = ctx.query;
    const res = await getFilterLectors((surname as string) ?? 'А');

    return {
        props: { lectors: res },
    };
};
