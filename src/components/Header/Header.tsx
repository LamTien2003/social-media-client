import images from '@/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faGear, faHome, faMessage, faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

import Search from '@/components/Search/Search';
import IconBoxWithPopup from '@/components/IconBoxWithPopup/IconBoxWithPopup';
import Messagebar from '@/components/Messagebar/Messagebar';
import NotifyBox from './components/NotifyBox';
import SettingBox from './components/SettingBox';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store/store';

import { useGetNotificationsQuery } from '@/services/notificationApiSlice';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { socket } from '@/services/socket';
import { useGetConversationsQuery } from '@/services/conversationApiSlice';
import Message from '@/type/Message';
import { addNotification, updateLastMessage } from '@/store/sideSlice';
import Loading from '../Loading/Loading';
import Notification from '@/type/Notification';
import SearchResultBox from './components/SearchResultBox';
import Tippy from '@tippyjs/react/headless';
import { userApi } from '@/services/userApiSlice';
import User from '@/type/User';

const Header = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useAppDispatch();
    const { isLoading: isGettingNotifications } = useGetNotificationsQuery();
    const { isLoading: isGettingConversations } = useGetConversationsQuery();
    const conversations = useSelector((state: RootState) => state.side.conversations);
    const notifications = useSelector((state: RootState) => state.side.notifications);
    const [searchResult, setSearchResult] = useState<User[]>([]);
    const [focusInput, setFocusInput] = useState(false);
    const [triggerSearch] = userApi.endpoints.getUsers.useLazyQuery();

    const handleSearch = useCallback(
        async (value: string) => {
            const response = await triggerSearch({ q: value }).unwrap();
            if (response.status !== 200 || response?.data?.status !== 'success') {
                throw response;
            }
            setSearchResult(response.data.data as User[]);
        },
        [triggerSearch],
    );

    const notificationIsNotSeen = useMemo(() => {
        return notifications.filter((item) => item.isSeen === false).length;
    }, [notifications]);
    const conversationsIsNotSeen = useMemo(() => {
        return conversations.filter(
            (item) => item?.latestMessage && !item?.latestMessage?.readBy.includes(user?.id as string),
        );
    }, [conversations, user?.id]);

    // Join all conversation when start app
    useEffect(() => {
        if (conversations.length > 0) {
            conversations.forEach((conversation) => socket.emit('joinRoom', conversation.id));
        }
    }, [conversations]);

    useEffect(() => {
        const handleNotificationReceived = (notification: Notification) => {
            dispatch(addNotification(notification));
        };
        const handleMessageReceived = (message: Message) => {
            dispatch(updateLastMessage(message));
        };
        socket.on('notification received', handleNotificationReceived);
        socket.on('messageReceived', handleMessageReceived);

        return () => {
            socket.off('notification received', handleNotificationReceived);
            socket.off('messageReceived', handleMessageReceived);
        };
    }, [dispatch]);

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-dark-450 dark:text-dark-100 flex justify-center py-2 px-10 transition-all">
            <div className="w-3/12 flex items-center space-x-10 mobile:hidden">
                <img src={images.LogoDark} alt="Logo" className="w-1/12 object-cove " />

                <Tippy
                    render={(attrs) => <SearchResultBox data={searchResult} {...attrs} />}
                    interactive
                    visible={focusInput && searchResult.length > 0}
                    onClickOutside={() => {
                        setFocusInput(false);
                    }}
                >
                    <div className="flex-1">
                        <Search handleFocus={() => setFocusInput(true)} handleSearch={handleSearch} />
                    </div>
                </Tippy>
            </div>

            <nav className="flex-1 text-center flex items-center justify-center space-x-4">
                <NavLink
                    to=""
                    className="bg-dark-500 text-white dark:bg-dark-350 dark:text-white py-3 px-14 rounded-md text-xl  hover:bg-dark-500 dark:hover:bg-dark-350"
                >
                    <FontAwesomeIcon icon={faHome} />
                </NavLink>
                <NavLink
                    to="/friendsRequest"
                    className=" text-gray-400 dark:text-white py-3 px-14 rounded-md text-xl hover:text-white hover:bg-dark-500 dark:hover:bg-dark-350"
                >
                    <FontAwesomeIcon icon={faUserFriends} />
                </NavLink>
                <NavLink
                    to={`/profile/${user?.id}`}
                    className=" text-gray-400 dark:text-white py-3 px-14 rounded-md text-xl hover:text-white hover:bg-dark-500 dark:hover:bg-dark-350"
                >
                    <FontAwesomeIcon icon={faUser} />
                </NavLink>
            </nav>

            <div className="w-2/12 text-center flex items-center space-x-5 text-2xl justify-end mobile:hidden">
                {isGettingNotifications ? (
                    <Loading />
                ) : (
                    <IconBoxWithPopup icon={<FontAwesomeIcon icon={faBell} />} notification={notificationIsNotSeen}>
                        <NotifyBox notifications={notifications} />
                    </IconBoxWithPopup>
                )}

                {isGettingConversations ? (
                    <Loading />
                ) : (
                    <IconBoxWithPopup
                        icon={<FontAwesomeIcon icon={faMessage} />}
                        notification={conversationsIsNotSeen.length}
                    >
                        <Messagebar />
                    </IconBoxWithPopup>
                )}

                <IconBoxWithPopup icon={<FontAwesomeIcon icon={faGear} />}>
                    <SettingBox />
                </IconBoxWithPopup>

                <NavLink to={`profile/${user?.id}`} className="w-1/4 cursor-pointer hover:text-dark-350">
                    <img
                        src={user?.photo}
                        alt=""
                        className="w-full max-h-[40px] max-w-[40px] object-cover rounded-full"
                    />
                </NavLink>
            </div>
        </header>
    );
};

export default Header;
