import Image from 'next/image';
import Link from 'next/link';

import Tippy from '@tippyjs/react';

import css from './LectorItem.module.scss';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

interface LectorItemProps {
    pk: string;
    name: string;
    work: string;
    workPosition: string;
    image: string;
}

export const LectorItem = ({
    work,
    name,
    pk,
    workPosition,
    image,
}: LectorItemProps) => {
    return (
        <div className={css.lector_slide}>
            <Link href={`/lectors/${pk}`} className={css.lector_image_wrapper}>
                <Image
                    className={css.lector_image}
                    fill
                    src={image}
                    alt={name}
                />
            </Link>
            <div className={css.lectors_slide_content}>
                <h3 className={css.lectors_slide_name}>{name}</h3>
                <Tippy
                    arrow={false}
                    placement="bottom"
                    theme="light"
                    content={
                        <p className={css.lectors_slide_tippy}>
                            {work} {workPosition}
                        </p>
                    }
                >
                    <p className={css.lectors_slide_work}>
                        {work} {workPosition}
                    </p>
                </Tippy>
            </div>
        </div>
    );
};
