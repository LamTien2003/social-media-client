import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faHome, faMessage, faSignOut, faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';

type Option = {
    title: string;
    children: {
        icon: JSX.Element;
        label: string;
        to: string;
    }[];
};
interface SidebarProps {
    options?: Option[];
    classNames?: string;
}
const sidebarOption = [
    {
        title: 'New Feeds',
        children: [
            { icon: <FontAwesomeIcon icon={faHome} />, label: 'Bảng tin', to: '' },
            { icon: <FontAwesomeIcon icon={faUserFriends} />, label: 'Bạn bè', to: '/friendsRequest' },
            { icon: <FontAwesomeIcon icon={faUser} />, label: 'Trang cá nhân ', to: '/profile/123' },
            { icon: <FontAwesomeIcon icon={faMessage} />, label: 'Quản trị admin', to: '/admin' },
        ],
    },
    {
        title: 'More Features',
        children: [
            { icon: <FontAwesomeIcon icon={faGear} />, label: 'Cài đặt', to: '/settings' },
            { icon: <FontAwesomeIcon icon={faSignOut} />, label: 'Đăng xuất', to: '/auth' },
        ],
    },
];

const Sidebar = memo((props: SidebarProps) => {
    const { options = sidebarOption, classNames } = props;
    const className = twMerge(
        'fixed top-[68px] bottom-0 left-0 w-[280px] min-h-screen p-6 flex flex-col items-start bg-white dark:bg-dark-450 shadow-lg dark:shadow-none mobile:hidden overflow-y-scroll transition-all',
        classNames,
    );
    return (
        <div className={className}>
            {options.map((item, index) => (
                <div className="flex flex-col justify-center w-full" key={index}>
                    <h3 className="text-xs font-semibold text-content-100 mb-6"> {item.title}</h3>
                    {item.children.map((item, index) => (
                        <NavLink
                            to={item.to}
                            className="flex items-center space-x-4 p-2 rounded-2xl hover:bg-dark-100 mb-3 group/item"
                            key={index}
                        >
                            <div className="text-dark-400 dark:text-white text-xl">{item.icon}</div>
                            <p className="flex-1 text-sm font-semibold text-content-300 group-hover/item:text-white dark:text-content-200">
                                {item.label}
                            </p>
                        </NavLink>
                    ))}
                </div>
            ))}
        </div>
    );
});

export default Sidebar;
