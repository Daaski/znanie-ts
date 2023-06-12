import React from 'react';
import Image from 'next/image';

import becomeLectorImg from '/public/images/BecomeLector/becomeLector.png';
import { Button } from 'components/UI/Button';
import { BecomeLector } from 'components/BecomeLector';
import { Layout } from 'components/Layout/Layout';
import { useUserStore } from 'store/UserStore';
import { useModalVisible } from 'store/ModalVisible';

import css from 'components/BecomeLector/BecomeLector.module.scss';

const BecomeLectorPage = () => {
    const [user] = useUserStore((state) => [state.user]);
    const [setUser] = useUserStore((state) => [state.setUser]);
    const [setModalVisible] = useModalVisible((state) => [
        state.setModalVisible,
    ]);

    if (!user.role || user.role === 'lector') {
        return (
            <Layout title="Станьте лектором общества Знание">
                <div className={css.role_not_found}>
                    <h2 className={css.role_text}>
                        {user.role === 'lector'
                            ? 'Вы уже лектор Знания'
                            : 'Чтобы стать лектором, сначала нужно зарегистрироваться'}
                    </h2>
                    <Image
                        className={css.role_image}
                        src={becomeLectorImg}
                        width={500}
                        height={550}
                        alt="Станьте лектором"
                    />
                    {!user.role && (
                        <div className={css.login_button_wrapper}>
                            <Button handleClick={() => setModalVisible(true)}>
                                Зарегистрироваться
                            </Button>
                        </div>
                    )}
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Станьте лектором общества Знание">
            <BecomeLector setUser={setUser} user={user} />
        </Layout>
    );
};

export default BecomeLectorPage;
