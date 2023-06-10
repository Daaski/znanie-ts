import { FC } from 'react';
import { motion } from 'framer-motion';

import { LinksProps } from 'components/Header/LinksWrappers/Links.types';
import { BecomeLinksData } from './data';
import { BecomeItem } from './BecomeItem';

import css from './BecomeLinks.module.scss';

export const BecomeLinks: FC<LinksProps> = ({
    padding,
    boxShadow,
    opacity,
    setVisible,
}) => {
    return (
        <motion.div
            style={{ opacity, boxShadow: boxShadow, padding: padding }}
            className={css.dropdown_wrapper}
        >
            <ul className={css.dropdown}>
                {BecomeLinksData.map((link) => (
                    <BecomeItem
                        setVisible={setVisible}
                        key={link.id}
                        {...link}
                    />
                ))}
            </ul>
        </motion.div>
    );
};
