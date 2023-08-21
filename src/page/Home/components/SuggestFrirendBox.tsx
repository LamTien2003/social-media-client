import images from '@/assets/images';
import Container from '@/components/Container/Container';
import { NavLink } from 'react-router-dom';
import icons from '@/assets/icons';
import { useGetSuggestFriendsQuery, useSendFriendRequestMutation } from '@/services/userApiSlice';
import Loading from '@/components/Loading/Loading';
import { toast } from 'react-toastify';

const SuggestFrirendBox = () => {
    const { data, isLoading } = useGetSuggestFriendsQuery();
    const [sendFriendRequest, { isLoading: isSending }] = useSendFriendRequestMutation();

    const handleSendFriend = async (id: string) => {
        try {
            const response = await sendFriendRequest(id).unwrap();
            if (response.status !== 200 || response?.data?.status !== 'success') {
                throw response;
            }
            toast.success('Đã gửi lời mời kết bạn');
        } catch (err: any) {
            toast.warn(err.msg);
        }
    };
    return (
        <Container classNames="mt-0 p-0">
            <div className="flex justify-between p-6 border-b border-b-dark-500-100 ">
                <h4 className="text-xs font-bold dark:text-white">Suggest Friend</h4>
                <NavLink to="" className="text-xs text-content-blue font-semibold">
                    See all
                </NavLink>
            </div>
            <div className="flex flex-col items-start justify-center my-4">
                <div className="flex flex-col items-start justify-center space-y-4 my-3 px-6 w-full">
                    {data?.data?.data?.map((item, index) => (
                        <NavLink
                            to={`/profile/${item?.id}`}
                            className="w-full flex items-center justify-between space-x-4"
                            key={index}
                        >
                            <div className="flex items-center space-x-4">
                                <img src={item?.photo} alt="" className="w-12 h-12 rounded-full " />
                                <div className="flex flex-col items-start space-y-1">
                                    <h4 className="text-xs text-black font-bold dark:text-white">{`${item?.firstName} ${item?.lastName}`}</h4>
                                    <span className="text-content-100 text-xs font-semibold dark:text-content-300">
                                        {item?.commonFriends} bạn chung
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleSendFriend(item?.id);
                                }}
                            >
                                {isSending ? (
                                    <Loading />
                                ) : (
                                    <img src={icons.addFriendIcon} alt="" className="w-5 h-5 dark:filter dark:invert" />
                                )}
                            </button>
                        </NavLink>
                    ))}
                    {isLoading && <Loading className="mx-auto" />}
                </div>
            </div>
        </Container>
    );
};

export default SuggestFrirendBox;
