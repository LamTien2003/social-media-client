import useClickOutside from '@/hooks/useClickOutside';
import { ReactNode, useState } from 'react';

interface Props {
    children?: ReactNode;
    onClickOutSide: () => void;
}
const Popup = (props: Props) => {
    const { children, onClickOutSide } = props;
    const popupRef = useClickOutside<HTMLDivElement>(() => onClickOutSide());

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="fixed top-0 left-0 right-0 bottom-0 bg-blur-100 flex items-center justify-center z-50"
        >
            <div ref={popupRef}>{children}</div>
        </div>
    );
};

export default Popup;
