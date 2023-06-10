import css from './SearchList.module.scss';

type onClickProps = {
    id: number;
    name: string;
};

interface SearchListProps {
    probablePlaces: {
        pk: number;
        subject: string;
        name: string;
        type: string;
    }[];
    onClick: ({}: onClickProps) => void;
    setVisible: (b: boolean) => void;
    disabled: boolean;
    dropdownName: string;
}

export const SearchList = ({
    probablePlaces,
    onClick,
    setVisible,
    disabled,
    dropdownName,
}: SearchListProps) => {
    return (
        <div className={css.searchlist_container}>
            <div className={css.searchlist_wrapper}>
                <ul className={css.searchlist}>
                    {!disabled && probablePlaces.length ? (
                        probablePlaces?.map((place, index) => {
                            if (index < 9)
                                return (
                                    <li
                                        onClick={() => {
                                            onClick({
                                                id: place.pk,
                                                name:
                                                    place.subject && place.type
                                                        ? place.subject +
                                                          ', ' +
                                                          place.type +
                                                          ' ' +
                                                          place.name
                                                        : place.name,
                                            });
                                            setVisible(false);
                                        }}
                                        key={index}
                                        className={css.searchlist_item}
                                    >
                                        <p className={css.searchlist_item_text}>
                                            {place.subject
                                                ? place.subject + ', '
                                                : ''}
                                            {place.type} {place.name}
                                        </p>
                                    </li>
                                );
                        })
                    ) : (
                        <p className={css.no_such_places}>
                            Начните вводить название {dropdownName}
                        </p>
                    )}
                </ul>
            </div>
        </div>
    );
};
