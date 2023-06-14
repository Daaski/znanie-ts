import { GetServerSideProps } from 'next';
import ky from 'ky';

import { HomePage } from 'components/HomePage';
import { Layout } from 'components/Layout/Layout';
import { LectorType } from 'http/types';

interface HomePageProps {
    lectors: LectorType[];
}

export default function Home({ lectors }: HomePageProps) {
    return (
        <Layout
            title="Общество Знание – проведение мероприятий"
            description="Открытые
                уроки, лекции, мастер - классы, запись на развивающие мероприятия"
        >
            <HomePage lectors={lectors} />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await ky
        .get(process.env.NEXT_PUBLIC_API_URL + 'api/users/lectors')
        .json();

    return {
        props: { lectors: res },
    };
};
