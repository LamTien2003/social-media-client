import { RootState } from '@/store/store';
import { InitialValue } from '@/store/themeSlice';
import { useSelector } from 'react-redux';

import { Outlet } from 'react-router-dom';

import Sidebar from '@/components/Sidebar/Sidebar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faNoteSticky, faUserFriends } from '@fortawesome/free-solid-svg-icons';

const sidebarOption = [
    {
        title: 'Các chức năng chính',
        children: [
            { icon: <FontAwesomeIcon icon={faUserFriends} />, label: 'Quản lý người dùng', to: '' },
            { icon: <FontAwesomeIcon icon={faNoteSticky} />, label: 'Quản lý bài viết', to: 'manageBlog' },
            { icon: <FontAwesomeIcon icon={faBackward} />, label: 'Trở lại trang chủ', to: '/' },
        ],
    },
];

const Admin: React.FC = () => {
    const theme = useSelector<RootState, InitialValue>((state) => state.theme);

    return (
        <div className={`${theme.isDark && 'dark'}`}>
            <Sidebar options={sidebarOption} classNames="top-0" />
            <div className="flex min-h-screen ml-[280px] dark:bg-dark-400 dark:text-white">
                <Outlet />
            </div>
        </div>
    );
};

export default Admin;
