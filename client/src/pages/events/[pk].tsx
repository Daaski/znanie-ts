import { getSingleEvent } from 'http/eventsApi';
import { GetServerSidePropsContext } from 'next';
import { SingleEventResponse } from 'http/types';
import { Event } from 'components/Event';
import { Layout } from 'components/Layout/Layout';

interface IEventPageProps {
    event: SingleEventResponse;
}

const EventPage = ({ event }: IEventPageProps) => {
    return (
        <Layout title={`${event.name} - Общество Знание`}>
            <Event event={event} />
        </Layout>
    );
};

export default EventPage;

export const getServerSideProps: (
    context: GetServerSidePropsContext
) => Promise<
    { props: { event: SingleEventResponse } } | { notFound: boolean }
> = async (ctx) => {
    const { pk } = ctx.params;
    try {
        const res = await getSingleEvent(+pk);
        return {
            props: {
                event: res,
            },
        };
    } catch (e) {
        if (e) {
            return {
                notFound: true,
            };
        }
    }
};
