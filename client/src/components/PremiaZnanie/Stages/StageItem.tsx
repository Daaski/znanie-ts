import React from 'react';

import { StageType } from 'components/PremiaZnanie/types/stages.ts';

import css from './Stages.module.scss';

interface IStageProps extends StageType {}

export const StageItem: React.FC<IStageProps> = ({ range, description }) => {
    return (
        <li className={css.stages_info_item_wrapper}>
            <div className={css.stages_info_item}>
                <p className={css.stages_info_text}>{range}</p>
                <h4 className={css.stages_info_decryption}>{description}</h4>
            </div>
        </li>
    );
};
