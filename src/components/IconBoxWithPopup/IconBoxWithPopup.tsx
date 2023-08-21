import useClickOutside from '@/hooks/useClickOutside';
import { ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
    icon: ReactNode;
    notification?: number;
    children?: ReactNode;
    className?: string;
}
const IconBoxWithPopup = (props: Props) => {
    const { icon, notification, children, className } = props;
    const [openPopup, setOpenPopup] = useState(false);
    const popupRef = useClickOutside<HTMLDivElement>(() => setOpenPopup(false));
    const classNames = twMerge('w-1/4 relative cursor-pointer hover:text-dark-350', className);

    return (
        <div ref={popupRef} className={classNames} onClick={() => setOpenPopup((prev) => !prev)}>
            {icon}
            {notification && (
                <span className="absolute top-0 right-0 text-white text-xs bg-orange-500 rounded-full w-4 h-4 flex justify-center items-center ">
                    {notification}
                </span>
            )}
            {openPopup && <div onClick={(e) => e.stopPropagation()}>{children}</div>}
        </div>
    );
};

export default IconBoxWithPopup;
