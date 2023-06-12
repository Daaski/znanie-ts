import { getSingleEvent } from 'http/eventsApi';
import { GetServerSideProps } from 'next';
import { SingleEventWithLectors } from 'http/types';
import { Event } from 'components/Event';
import { Layout } from 'components/Layout/Layout';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';

interface IEventPageProps {
    event: SingleEventWithLectors;
}

const EventPage = ({ event }: IEventPageProps) => {
    return (
        <Layout title={`${event.name} - Общество Знание`}>
            <Event event={event} />
        </Layout>
    );
};

export default EventPage;

export const getServerSideProps: GetServerSideProps<
    { event: SingleEventWithLectors } | { notFound: boolean },
    NextParsedUrlQuery
> = async (ctx) => {
    const pk = ctx.params?.pk;
    try {
        if (!pk) {
            throw new Error('Не найдено');
        }
        const res = await getSingleEvent(+pk);
        return Promise.resolve({
            props: {
                event: res,
            },
        });
    } catch (e) {
        return Promise.resolve({
            notFound: true,
        });
    }
};
