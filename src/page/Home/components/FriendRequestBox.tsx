import Container from '@/components/Container/Container';
import Loading from '@/components/Loading/Loading';
import { socket } from '@/services/socket';
import { useAcceptFriendMutation } from '@/services/userApiSlice';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

interface PendingUser {
    id: string;
    firstName: string;
    lastName: string;
    photo: string;
    commonFriends: number;
}

const FriendRequestBox = () => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const [acceptFriend, { isLoading }] = useAcceptFriendMutation();

    const handleAcceptFriend = async (user: PendingUser) => {
        try {
            if (isLoading) {
                return toast.error('Hành động đang được thực hiện, vui lòng đợi');
            }
            const response = await acceptFriend(user.id).unwrap();
            if (response.status !== 200 || response?.data?.status !== 'success') {
                throw response;
            }
            socket.emit('notification sending', {
                sender: currentUser,
                receiver: user,
                type: 'friend',
                content: 'đã chấp nhận lời mời kết bạn',
                entityId: currentUser?.id,
                isSeen: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });
            toast.success('Kết bạn thành công');
        } catch (err: any) {
            toast.warn(err.msg);
        }
    };
    return (
        <Container classNames="mt-0 p-0">
            <div className="flex justify-between p-6 border-b border-b-dark-500-100 ">
                <h4 className="text-xs font-bold dark:text-white">Lời mời kết bạn</h4>
                <NavLink to="/friendsRequest" className="text-xs text-content-blue font-semibold">
                    Xem tất cả
                </NavLink>
            </div>
            <div className="flex flex-col items-start justify-center my-4">
                {currentUser?.pending.map((item, index) => (
                    <NavLink
                        to={`/profile/${item.id}`}
                        className="flex flex-col items-start justify-center space-y-4 my-3 px-6 w-full"
                        key={index}
                    >
                        <div className="flex items-center space-x-4">
                            <img src={item?.photo} alt="" className="w-12 h-12 rounded-full" />
                            <div className="flex flex-col items-start space-y-1">
                                <h4 className="line-clamp-2 text-left text-xs text-black font-bold dark:text-white">{`${item?.firstName} ${item?.lastName}`}</h4>
                                <span className="text-content-100 text-xs font-semibold dark:text-content-300">
                                    {item?.commonFriends} bạn chung
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                className="bg-content-blue text-white text-xs font-bold rounded-full px-6 py-[10px]"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleAcceptFriend(item);
                                }}
                            >
                                {isLoading ? <Loading /> : 'Xác nhận'}
                            </button>
                            <button className="bg-light-300 text-content-300 text-xs font-bold rounded-full px-6 py-[10px]">
                                Xóa
                            </button>
                        </div>
                    </NavLink>
                ))}
            </div>
        </Container>
    );
};

export default FriendRequestBox;
