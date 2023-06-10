import { ServicesList } from './data';
import { ServiceItem } from './ServiceItem';

import css from './Services.module.scss';

export const Services = () => {
    return (
        <section className={css.services_layout}>
            <div className={css.services_grid}>
                {ServicesList.map((service) => (
                    <ServiceItem key={service.id} {...service} />
                ))}
            </div>
        </section>
    );
};
