import { getUser } from 'http/userApi';
import { SetUserType } from 'store/types/userStore.types';

export const setFullUser: (setUser: SetUserType) => Promise<void> = async (
    setUser
) =>
    await getUser().then((r) => {
        r?.phone &&
            setUser({
                pk: r.pk,
                addressId: +r.address_pk,
                addressName: r.address_name,
                addressSubject: r.address_subject,
                createdEvents: r.created_events,
                educationId: r.education_pk + '',
                education: r.education_place,
                educationEnd: r.education_graduated_year,
                email: r.email,
                events: r.selected_events,
                favorites: r.favourites,
                job: r.work_place,
                jobTitle: r.work_position,
                likes: r.likes,
                role: r.role,
                speciality: r.education_major,
                tel: r.phone,
                name: r.name,
                surname: r.surname,
                patronymic: r.patronymic,
                gender: r.gender,
                birthday: r.birthdate,
                img: r.image,
                isAuth: true,
            });
    });
