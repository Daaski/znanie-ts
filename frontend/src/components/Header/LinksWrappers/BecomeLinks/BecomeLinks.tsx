import { FC } from 'react';
import { motion } from 'framer-motion';

import { LinksProps } from 'components/Header/LinksWrappers/Links.types';
import { BecomeLinksData } from './data';
import { BecomeItem } from './BecomeItem';

import css from './BecomeLinks.module.scss';

export const BecomeLinks: FC<LinksProps> = ({
    padding,
    boxShadows,
    opacity,
    setVisible,
}) => {
    return (
        <motion.div
            style={{ opacity, boxShadow: boxShadows, padding: padding }}
            className={css.dropdown_wrapper}
        >
            <ul className={css.dropdown}>
                {BecomeLinksData.map((link) => (
                    <BecomeItem
                        setVisible={setVisible as (b: boolean) => void}
                        key={link.id}
                        {...link}
                    />
                ))}
            </ul>
        </motion.div>
    );
};
