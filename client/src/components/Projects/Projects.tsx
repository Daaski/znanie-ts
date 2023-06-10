import Image from 'next/image';

import { ProjectLinksData } from './data';
import { Button } from 'components/UI/Button';

import css from './Projects.module.scss';

export const Projects = () => {
    return (
        <main className={css.projects_wrapper}>
            <h1 className={css.projects_title}>Проекты</h1>
            {ProjectLinksData.map((project, index) => (
                <div key={index} className={css.project_wrapper}>
                    <div className={css.project_content}>
                        <h2 className={css.project_title}>{project.name}</h2>
                        <p className={css.project_text}>
                            {project.description}
                        </p>
                        <div className={css.project_button}>
                            <Button href={project.href}>Подробнее</Button>
                        </div>
                    </div>
                    <div className={css.project_image_wrapper}>
                        <span className={css.project_image}>
                            <Image src={project.img} alt={project.name} fill />
                        </span>
                    </div>
                </div>
            ))}
        </main>
    );
};
