import Image from 'next/image';
import Link from 'next/link';

import { useUserStore } from 'store/UserStore';
import { useModalVisible } from 'store/ModalVisible';
import YoutubeIcon from '/public/images/Footer/utubefooter.svg';
import VkIcon from '/public/images/Footer/vkfooter.svg';
import TelegramIcon from '/public/images/Footer/telegramfooter.svg';
import BecomeSpeaker from './icons/becomeSpeaker.svg';
import BecomeMember from './icons/becomeMember.svg';

import css from './Footer.module.scss';

export const Footer = () => {
    const [user, setUser] = useUserStore((state) => [state.user]);
    const [setModalVisible] = useModalVisible((state) => [
        state.setModalVisible,
    ]);

    return (
        <footer className={css.footer_layout}>
            <div className={css.footer_first}>
                <ul className={css.footer_intresting}>
                    <Link href="/events" className={css.footer_intresting_link}>
                        Мероприятия
                    </Link>
                    <Link
                        href="https://znanierussia.ru/podcasts"
                        className={css.footer_intresting_link}
                    >
                        Подкасты
                    </Link>
                    <Link
                        href="https://znanierussia.ru/news"
                        className={css.footer_intresting_link}
                    >
                        Новости
                    </Link>
                    <div className={css.footer_intresting_net}>
                        <Link
                            href="https://vk.com/znanierussia"
                            className={css.intresting_links_img_wrapper}
                        >
                            <VkIcon className={css.link_img} />
                        </Link>
                        <Link
                            href="https://www.youtube.com/@user-ej2ly2ed6d/videos"
                            className={css.intresting_links_img_wrapper}
                        >
                            <YoutubeIcon className={css.link_img} />
                        </Link>
                        <Link
                            href="https://t.me/Znanie_Russia"
                            className={css.intresting_links_img_wrapper}
                        >
                            <TelegramIcon className={css.link_img} />
                        </Link>
                    </div>
                </ul>
                <ul className={css.footer_about_links}>
                    <Link
                        href="https://znanierussia.ru/about"
                        className={css.footer_about_link}
                    >
                        Об обществе
                    </Link>
                    <Link
                        href="https://znanierussia.ru/management"
                        className={css.footer_about_link}
                    >
                        Руководство
                    </Link>
                    <Link
                        href="https://znanierussia.ru/purchases"
                        className={css.footer_about_link}
                    >
                        Закупки
                    </Link>
                    <div className={css.footer_about_become}>
                        {user.role !== 'lector' && (
                            <Link
                                href="/become-lector"
                                className={css.footer_about_become_wrapper}
                            >
                                <BecomeSpeaker
                                    className={css.footer_about_become_img}
                                />
                                <p className={css.footer_about_become_text}>
                                    Стать лектором
                                </p>
                            </Link>
                        )}
                        {!user.isAuth && (
                            <div
                                onClick={() => setModalVisible(true)}
                                className={css.footer_about_become_wrapper}
                            >
                                <BecomeMember
                                    className={css.footer_about_become_img}
                                />

                                <p className={css.footer_about_become_text}>
                                    Стать членом РОЗ
                                </p>
                            </div>
                        )}
                    </div>
                </ul>
                <address className={css.footer_communication}>
                    <a
                        href={'tel:+7 (915) 078-29-99'}
                        className={css.footer_communication_number}
                    >
                        +7 (495) 122-23-43
                    </a>
                    <a
                        href={'tel:+7 (915) 078-29-99'}
                        className={css.footer_communication_number}
                    >
                        +7 (915) 078-29-99
                    </a>
                    <p className={css.footer_communication_decryption}>
                        Техническая поддержка:
                    </p>
                    <a
                        href={'mailto:<support@znanierussia.ru>'}
                        className={css.footer_communication_feedback}
                    >
                        support@znanierussia.ru
                    </a>
                    <p className={css.footer_communication_decryption}>
                        Приемная Общесва «Знание»:
                    </p>
                    <a
                        href={'mailto:<info@znanierussia.ru>'}
                        className={css.footer_communication_feedback}
                    >
                        info@znanierussia.ru
                    </a>
                    <p className={css.footer_communication_address_text}>
                        Адрес организации:
                    </p>
                    <span className={css.footer_communication_address}>
                        109240, Санкт-Петербург, Внутригородская территория
                        муниципальный округ Таганский, ул. Ломоносовская, д. 11
                        строение
                    </span>
                </address>
            </div>
            <div className={css.footer_second}>
                <p className={css.footer_second_znanie}>
                    © 2023 Российское общество «Знание»
                </p>
                <ul className={css.footer_documents}>
                    <Link
                        href="https://roz-events.storage.yandexcloud.net/media/documents/privacy_policy.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className={css.documents_item}
                    >
                        Политика конфиденциальности
                    </Link>
                    <Link
                        href="https://roz-events.storage.yandexcloud.net/media/documents/user_agreement.pdf"
                        target="_blank"
                        className={css.documents_item}
                    >
                        Пользовательское соглашение
                    </Link>
                </ul>
                <ul className={css.footer_statutes}>
                    <Link
                        href="https://roz-events.storage.yandexcloud.net/media/documents/%D0%A3%D1%81%D1%82%D0%B0%D0%B2.pdf"
                        target="_blank"
                        className={css.statutes_item}
                    >
                        Устав Российского общества «Знание»
                    </Link>
                    <Link
                        href="https://roz-events.storage.yandexcloud.net/media/documents/%D0%A3%D0%BA%D0%B0%D0%B7_%D0%9F%D1%80%D0%B5%D0%B7%D0%B8%D0%B4%D0%B5%D0%BD%D1%82%D0%B0_%D0%A0%D0%A4_%D0%BE%D1%82_11.12.2015_617.pdf"
                        target="_blank"
                        className={css.statutes_item}
                    >
                        Указ о создании Российского общества «Знание»
                    </Link>
                </ul>
            </div>
        </footer>
    );
};
