import { ChangeEventHandler, useRef } from 'react';

import { useResizeWidth } from 'helpers/useResizeWidth';
import { updateUserImg } from 'http/userApi';
import { useUserStore } from 'store/UserStore';
import { ImgModal } from 'components/UI/Modals/ImgModal';

interface ChangeImgModalProps {
    setVisible: (b: boolean) => void;
}

export const ChangeImgModal = ({ setVisible }: ChangeImgModalProps) => {
    const [user] = useUserStore((state) => [state.user]);
    const [setUser] = useUserStore((state) => [state.setUser]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const { tabletBreak } = useResizeWidth();

    const handleChangeFile: ChangeEventHandler<HTMLInputElement> = (e) => {
        try {
            updateUserImg(e.target.files as FileList).then((r) =>
                setUser({ ...user, img: r.image })
            );
            setVisible(false);
        } catch (e: any) {
            console.log(e.message);
        }
    };

    return (
        <ImgModal
            ref={fileInputRef}
            setVisible={setVisible}
            tabletBreak={tabletBreak}
            handleChangeFile={handleChangeFile}
        />
    );
};
