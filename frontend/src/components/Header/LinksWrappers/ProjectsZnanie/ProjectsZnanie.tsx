import { motion } from 'framer-motion';

import { ProjectLinksData } from 'components/Projects/data';
import { ProjectZnanieItem } from 'components/Header/LinksWrappers/ProjectsZnanie/ProjectZnanieItem';
import { Button } from 'components/UI/Button';
import { ProjectsZnanieProps } from 'components/Header/dropdowns/ProjectsDropdown/ProjectsZnanie.types';

import css from 'components/Header/LinksWrappers/BecomeLinks/BecomeLinks.module.scss';

export const ProjectsZnanie = ({
    padding,
    boxShadow,
    opacity,
}: ProjectsZnanieProps) => {
    return (
        <motion.div
            style={{ opacity, boxShadow: boxShadow, padding: padding }}
            className={css.dropdown_wrapper}
        >
            <ul className={css.dropdown}>
                {ProjectLinksData.map((link, index) => (
                    <ProjectZnanieItem key={index} event={link} />
                ))}
            </ul>
            <Button href="/projects">Смотреть все</Button>
        </motion.div>
    );
};
