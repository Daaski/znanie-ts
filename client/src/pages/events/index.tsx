import { Layout } from 'components/Layout/Layout';
import { Events } from 'components/Events';
import { getFilterEvents } from 'http/eventsApi';

const EventsPage = ({ events }) => {
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

export const getServerSideProps = async (context) => {
    const page = context.query.page;
    const start = context.query.start;
    const end = context.query.end;
    const subject = context.query.subject;

    const res = await getFilterEvents(page, subject, start, end);

    return {
        props: {
            events: res,
            revalidate: 10,
        },
    };
};
