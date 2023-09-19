import { RootState, useAppDispatch } from '@/store/store';
import { joinMessageRoom } from '@/store/sideSlice';
import { useSelector } from 'react-redux';
import Conversation from '@/type/Conversation';

interface Props {
    data: Conversation & { isOnline: boolean };
}
const MessagebarItem = (props: Props) => {
    const { data } = props;
    const user = useSelector((state: RootState) => state.user.user);
    const messageRoomJoined = useSelector((state: RootState) => state.side.messageRoomJoined);
    const dispatch = useAppDispatch();

    const handleClickItem = (id: string) => {
        if (messageRoomJoined.includes(id)) return;
        dispatch(joinMessageRoom(id));
    };

    return (
        <div className="w-full relative flex items-center justify-evenly my-4" onClick={() => handleClickItem(data.id)}>
            <div className="flex items-center space-x-2">
                <img
                    src={data.members.find((member) => member.id !== user?.id)?.photo}
                    alt=""
                    className="rounded-full w-1/5"
                />
                <span className="flex-1 text-xs text-left font-bold text-dark-500 dark:text-content-200 ">
                    {data?.name
                        ? data.name
                        : data.members
                              .map((member) =>
                                  member.id !== user?.id ? `${member?.firstName} ${member?.lastName}` : null,
                              )
                              .filter((item) => item !== null)
                              .join(', ')}
                </span>
            </div>
            {data.isOnline && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-green-500 w-2 h-2 ml-10"></span>
            )}
            {data?.latestMessage && !data?.latestMessage?.readBy.includes(user?.id as string) && (
                <span className=" absolute -top-5 left-6 block p-2 bg-red-500 text-white text-xs rounded-md">
                    Tin nhắn mới
                </span>
            )}
        </div>
    );
};

export default MessagebarItem;
