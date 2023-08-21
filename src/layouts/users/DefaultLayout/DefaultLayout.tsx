import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';

import { RootState } from '@/store/store';
import { InitialValue } from '@/store/themeSlice';
import { useSelector } from 'react-redux';

import { Outlet } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faHome, faMessage, faSignOut, faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { useMemo } from 'react';
import { useLogoutMutation } from '@/services/authApiSlice';

const DefaultLayout = () => {
    const theme = useSelector<RootState, InitialValue>((state) => state.theme);
    const currentUser = useSelector((state: RootState) => state.user.user);
    const [logout] = useLogoutMutation();

    const sidebarOption = useMemo(() => {
        return [
            {
                title: 'New Feeds',
                children: [
                    { icon: <FontAwesomeIcon icon={faHome} />, label: 'Bảng tin', to: '' },
                    { icon: <FontAwesomeIcon icon={faUserFriends} />, label: 'Bạn bè', to: '/friendsRequest' },
                    {
                        icon: <FontAwesomeIcon icon={faUser} />,
                        label: 'Trang cá nhân ',
                        to: `/profile/${currentUser?.id}`,
                    },
                    { icon: <FontAwesomeIcon icon={faMessage} />, label: 'Quản trị admin', to: '/admin' },
                ],
            },
            {
                title: 'More Features',
                children: [
                    { icon: <FontAwesomeIcon icon={faGear} />, label: 'Cài đặt', to: '/settings' },
                    {
                        icon: <FontAwesomeIcon icon={faSignOut} />,
                        label: 'Đăng xuất',
                        to: '/auth',
                        onClick: (e: React.MouseEvent) => {
                            e.preventDefault();
                            logout();
                        },
                    },
                ],
            },
        ];
    }, [currentUser?.id, logout]);

    return (
        <div className={`flex flex-col mobile:flex-col-reverse ${theme.isDark && 'dark'}`}>
            <Header />
            <div className=" min-h-screen relative bg-light-200 dark:bg-dark-400 transition-all">
                {!theme.isMinimal && <Sidebar options={sidebarOption} />}

                <div className={`ml-[280px] mt-[68px] text-center transition-all mobile:mx-auto `}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DefaultLayout;
