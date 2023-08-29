import Loading from '@/components/Loading/Loading';
import { socket } from '@/services/socket';
import { useAcceptFriendMutation, useCancelFriendRequestMutation } from '@/services/userApiSlice';
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

const FriendsRequest = () => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const [acceptFriend, { isLoading: isAccepting }] = useAcceptFriendMutation();
    const [cancelFriend, { isLoading: isCanceling }] = useCancelFriendRequestMutation();

    const handleAcceptFriend = async (user: PendingUser) => {
        try {
            if (isAccepting) {
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
    const handleCancelFriendRequest = async (user: PendingUser) => {
        try {
            await cancelFriend(user.id).unwrap();
            toast.error('Hủy lời mời kết bạn thành công');
        } catch (err: any) {
            toast.warn(err.msg);
        }
    };
    return (
        <div className=" flex flex-col items-start px-10 space-y-4">
            <h2 className="text-lg font-bold dark:text-white ">Lời mời kết bạn</h2>
            <div className="w-full flex flex-wrap justify-left">
                {currentUser?.pending?.map((item, index) => (
                    <div className="w-2/12 p-3">
                        <NavLink
                            to={`/profile/${item?.id}`}
                            className="w-full flex flex-col items-start rounded-xl shadow-xl border-[0.8px] border-light-300 pb-3 dark:border-light-100 dark:shadow-none"
                            key={index}
                        >
                            <img
                                src={item.photo}
                                alt=""
                                className="w-full max-h-[230px] rounded-tr-xl rounded-tl-xl object-cover"
                            />
                            <div className="w-full px-4 mt-2 text-left">
                                <h4 className="font-semibold text-md dark:text-white">{`${item.firstName} ${item.lastName}`}</h4>
                                <span className="text-xs text-content-300 font-semibold">
                                    {item?.commonFriends} bạn chung
                                </span>
                            </div>
                            <div className="w-full flex flex-col space-y-1 items-center justify-center px-2 mt-2">
                                <button
                                    className="w-full py-2.5 px-2 bg-content-blue text-white text-xs font-bold rounded-lg"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleAcceptFriend(item);
                                    }}
                                >
                                    {isAccepting ? <Loading /> : 'Xác nhận'}
                                </button>
                                <button
                                    className="w-full py-2.5 px-2 bg-content-100 text-white text-xs font-bold rounded-lg"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleCancelFriendRequest(item);
                                    }}
                                >
                                    {isCanceling ? <Loading /> : 'Xóa'}
                                </button>
                            </div>
                        </NavLink>
                    </div>
                ))}
                {!currentUser?.pending.length && (
                    <div className="w-full text-center font-semibold text-lg dark:text-white">
                        Không có lời mời kết bạn nào
                    </div>
                )}
            </div>
        </div>
    );
};

export default FriendsRequest;
