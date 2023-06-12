import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { SEO } from 'components/SEO/Seo';
import { ReactNode } from 'react';

interface ILayoutProps {
    children: ReactNode;
    description?: string;
    title?: string;
}

export const Layout = ({ children, description, title }: ILayoutProps) => {
    return (
        <>
            <SEO description={description as string} title={title as string} />
            <Header />
            {children}
            <Footer />
        </>
    );
};
