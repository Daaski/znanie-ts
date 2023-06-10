import { ClipLoader } from 'react-spinners';

export const Spinner = () => {
    return (
        <ClipLoader
            cssOverride={{
                position: 'absolute',
                top: 'calc(50% - 50px)',
                left: 'calc(50% - 50px)',
                width: '100px',
                height: '100px',
            }}
        />
    );
};
