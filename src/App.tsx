import { Routes, Route } from 'react-router-dom';
import { Home } from '@/page/Home/Home';
// import { useGetPostsQuery } from '@/services/postSlice';

import NoHeaderLayout from '@/layouts/users/NoHeaderLayout/NoHeaderLayout';
import DefaultLayout from '@/layouts/users/DefaultLayout/DefaultLayout';

import Profile from '@/page/Profile/Profile';
import OverviewContainer from '@/page/Profile/components/OverviewContainer/OverviewContainer';
import IntroduceContainer from '@/page/Profile/components/IntroduceContainer/IntroduceContainer';

import Auth from '@/page/Auth/Auth';
import FriendsRequest from '@/page/FriendsRequest/FriendsRequest';
import Settings from '@/page/Settings/Settings';
import Admin from '@/page/Admin/Admin';
import ManageUser from './page/Admin/components/ManageUser';
import ManageBlog from './page/Admin/components/ManageBlog';
import ProtectedRoutes from './layouts/auth/ProtectedRoutes';
import { useCallback, useEffect } from 'react';
import { socket } from './services/socket';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from './store/store';
import { changeOnlineFriends, joinMessageRoom } from './store/sideSlice';

import Notification from './type/Notification';
import Message from './type/Message';
import { conversationApi } from './services/conversationApiSlice';

function App() {
    const user = useSelector((state: RootState) => state.user.user);
    const messageRoomJoined = useSelector((state: RootState) => state.side.messageRoomJoined);
    const [triggerGetConversations] = conversationApi.endpoints.getConversations.useLazyQuery();
    const dispatch = useAppDispatch();
    const showPopupNotification = (notification: Notification) => {
        toast(
            <div className=" flex space-x-4">
                <img src={notification.sender?.photo} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1">
                    <span className="text-content-300 font-semibold mr-1">{`${notification.sender?.firstName} ${notification.sender?.lastName}`}</span>
                    <span>
                        {notification.type === 'reaction'
                            ? 'vừa thả cảm xúc cho bài viết của bạn'
                            : notification.content
                            ? notification.content
                            : 'vừa gửi cho bạn yêu cầu kết bạn'}
                    </span>
                </div>
            </div>,
        );
    };

    const notificationRecivedHandle = useCallback(
        (notification: Notification) => {
            triggerGetConversations();
            showPopupNotification(notification);
        },
        [triggerGetConversations],
    );
    const sendGetOnlinesRequest = useCallback(() => {
        if (user?.id) {
            socket.emit('getOnlinesCurrently', user.id);
        }
    }, [user?.id]);

    const getUsersOnline = useCallback(
        (users: { userId: string; socketId: string }[]) => {
            dispatch(changeOnlineFriends(users));
        },
        [dispatch],
    );
    const handleMessageReceived = useCallback(
        (message: Message) => {
            if (!messageRoomJoined.includes(message.conversation)) {
                dispatch(joinMessageRoom(message.conversation));
            }
        },
        [dispatch, messageRoomJoined],
    );
    useEffect(() => {
        socket.on('notification received', notificationRecivedHandle);
        socket.on('getOnlines', sendGetOnlinesRequest);
        socket.on('currentlyOnlines', getUsersOnline);
        socket.on('messageReceived', handleMessageReceived);

        return () => {
            socket.off('notification received', notificationRecivedHandle);
            socket.off('getOnlines', sendGetOnlinesRequest);
            socket.off('currentlyOnlines', getUsersOnline);
            socket.off('messageReceived', handleMessageReceived);
        };
    }, [
        dispatch,
        getUsersOnline,
        handleMessageReceived,
        messageRoomJoined,
        notificationRecivedHandle,
        sendGetOnlinesRequest,
    ]);

    return (
        <>
            <Routes>
                {/* Public Routes */}
                <Route path="auth" element={<NoHeaderLayout />}>
                    <Route index element={<Auth />} />
                </Route>

                {/* Protected Routes */}
                <Route element={<ProtectedRoutes />}>
                    <Route path="" element={<DefaultLayout />}>
                        <Route index element={<Home />} />
                        <Route path="profile/:id" element={<Profile />}>
                            <Route path="about" element={<IntroduceContainer />} />
                            <Route path="friends" element={<div>Friends</div>} />
                            <Route path="photos" element={<div>Photos</div>} />
                            <Route index element={<OverviewContainer />} />
                        </Route>
                        <Route path="friendsRequest" element={<FriendsRequest />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="*" element={<div>Page not found</div>} />
                    </Route>

                    <Route path="admin" element={<Admin />}>
                        <Route index element={<ManageUser />} />
                        <Route path="manageBlog" element={<ManageBlog />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
