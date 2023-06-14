import { Layout } from 'components/Layout/Layout';
import { Events } from 'components/Events';
import { getFilterEvents } from 'http/eventsApi';
import { EventsResponse } from 'http/types';
import { GetServerSideProps } from 'next';

interface EventsPageProps {
    events: EventsResponse;
}

const EventsPage = ({ events }: EventsPageProps) => {
    return (
        <Layout
            title="Календарь мероприятий"
            description="Мероприятия Общества Знание"
        >
            <Events events={events} />
        </Layout>
    );
};

export default EventsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const page = ctx.query.page;
    const start = ctx.query.start;
    const end = ctx.query.end;
    const subject = ctx.query.subject;


    const res = await getFilterEvents(
        page as number | undefined,
        subject as string,
        start as string,
        end as string
    );

    return {
        props: {
            events: res,
            revalidate: 10,
        },
    };
};
