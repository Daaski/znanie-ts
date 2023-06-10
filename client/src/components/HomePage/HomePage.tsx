import { MainSlider } from './MainSlider';
import { Services } from './Services';
import { Lectors } from './Lectors';
import { LectorType } from 'http/types';

interface HomePageProps {
    lectors: LectorType[];
}

export const HomePage = ({ lectors }: HomePageProps) => {
    return (
        <>
            <main>
                <MainSlider />
                <Services />
                <Lectors lectors={lectors} />
            </main>
        </>
    );
};
