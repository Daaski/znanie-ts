import Head from 'next/head';

interface ISEOprops {
    description?: string;
    title?: string;
}

export function SEO({
    description = 'Открытые уроки, лекции, мастер - классы, запись на развивающие мероприятия',
    title = 'Общество Знание – проведение мероприятий',
}: ISEOprops) {
    return (
        <Head>
            <title>{`${title}`}</title>
            <meta name="description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="twitter:card" content="summary" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
        </Head>
    );
}
