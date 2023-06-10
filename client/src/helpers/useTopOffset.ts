import { useState, useEffect } from 'react';

export const useTopOffset = (ref) => {
    const [height, setHeight] = useState<number>();
    const [offset, setOffset] = useState();

    useEffect(() => {
        setOffset(ref.current?.getBoundingClientRect().y);
    }, [ref]);

    useEffect(() => {
        const scrollTop = (e) => {
            setHeight(window.scrollY);
        };
        window.addEventListener('scroll', scrollTop);
        return () => window.removeEventListener('scroll', scrollTop);
    }, []);

    return height - 40 >= offset;
};
