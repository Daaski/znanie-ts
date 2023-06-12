import { FC, useState } from 'react';
import Image from 'next/image';

import { IProfileSidebarProps } from 'components/Profile/ProfileSidebar/ProfileSidebar.types';
import EditSvg from 'components/Profile/icons/edit.svg';

import css from './ProfileSidebar.module.scss';
import { ChangeImgModal } from 'components/Profile/ChangeImgModal';

export const ProfileSidebar: FC<IProfileSidebarProps> = ({
    userImg,
    userName,
    userSurname,
}) => {
    const [visible, setVisible] = useState(false);
    return (
        <aside className={css.profile_sidebar}>
            <div className={css.user_avatar}>
                <div className={css.user_avatar_img_wrapper}>
                    <Image
                        className={css.user_avatar_img}
                        src={userImg}
                        fill
                        alt="Изображение пользователя"
                    />
                </div>
                <button
                    onClick={() => setVisible(true)}
                    className={css.change_img_wrapper}
                >
                    <EditSvg />
                </button>
                <h2 className={css.user_avatar_fullname}>
                    {userName} {userSurname}
                </h2>
            </div>
            {visible && <ChangeImgModal setVisible={setVisible} />}
        </aside>
    );
};
