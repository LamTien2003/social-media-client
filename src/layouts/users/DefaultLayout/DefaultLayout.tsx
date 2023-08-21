import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';

import { RootState } from '@/store/store';
import { InitialValue } from '@/store/themeSlice';
import { useSelector } from 'react-redux';

import { Outlet, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faHome, faMessage, faSignOut, faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { useMemo } from 'react';
import { useLogoutMutation } from '@/services/authApiSlice';
import { removeToken } from '@/utils/utils';
import { toast } from 'react-toastify';
import Loading from '@/components/Loading/Loading';

const DefaultLayout = () => {
    const theme = useSelector<RootState, InitialValue>((state) => state.theme);
    const currentUser = useSelector((state: RootState) => state.user.user);
    const [logout, { isLoading }] = useLogoutMutation();
    const navigate = useNavigate();

    const sidebarOption = useMemo(() => {
        return [
            {
                title: 'New Feeds',
                children: [
                    { icon: <FontAwesomeIcon icon={faHome} />, label: 'Bảng tin', to: '' },
                    { icon: <FontAwesomeIcon icon={faUserFriends} />, label: 'Bạn bè', to: '/friendsRequest' },

                    currentUser?.role === 'admin'
                        ? {
                              icon: <FontAwesomeIcon icon={faMessage} />,
                              label: 'Quản trị admin',
                              to: '/admin',
                          }
                        : {
                              icon: <FontAwesomeIcon icon={faUser} />,
                              label: 'Trang cá nhân ',
                              to: `/profile/${currentUser?.id}`,
                          },
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
                        onClick: async (e: React.MouseEvent) => {
                            try {
                                e.preventDefault();
                                const response = await logout().unwrap();
                                if (response.status !== 200 || response?.data?.status !== 'success') {
                                    throw response;
                                }
                                removeToken();
                                toast.success('Đăng xuất thành công');
                                navigate('/auth');
                            } catch (err: any) {
                                toast.error(err?.data.msg);
                            }
                        },
                    },
                ],
            },
        ];
    }, [currentUser?.id, currentUser?.role, logout, navigate]);

    return (
        <div className={`flex flex-col mobile:flex-col-reverse ${theme.isDark && 'dark'}`}>
            <Header />
            <div className=" min-h-screen relative bg-light-200 dark:bg-dark-400 transition-all">
                {!theme.isMinimal && <Sidebar options={sidebarOption} />}
                <div className={`ml-[280px] mt-[68px] text-center transition-all mobile:mx-auto `}>
                    {isLoading ? <Loading /> : <Outlet />}
                </div>
            </div>
        </div>
    );
};

export default DefaultLayout;
