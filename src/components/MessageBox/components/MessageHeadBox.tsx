import Conversation from '@/type/Conversation';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface Props {
    data: Conversation;
}
const MessageHeadBox = (props: Props) => {
    const { data } = props;
    const currentUser = useSelector((state: RootState) => state.user.user);
    const onlineFriends = useSelector((state: RootState) => state.side.onlineFriends);

    const isOnline = useMemo(() => {
        return data.members.some((member) => onlineFriends.some((friend) => friend.userId === member.id));
    }, [data.members, onlineFriends]);
    return (
        <>
            {data.members?.length && data.members?.length > 2 ? (
                'Đây là group chat'
            ) : (
                <img
                    src={data.members.filter((member) => member.id !== currentUser?.id)[0].photo}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                />
            )}

            <div className="flex flex-col space-y-1">
                <h5 className="text-xs font-bold">
                    {data.name
                        ? data.name
                        : data.members
                              .map((member) =>
                                  member.id !== currentUser?.id ? `${member?.firstName} ${member?.lastName}` : null,
                              )
                              .filter((item) => item !== null)
                              .join(', ')}
                </h5>
                {isOnline && (
                    <div className="text-xs flex items-center space-x-1">
                        <span className="block w-3 h-3 bg-green-500 rounded-full"></span>
                        <span className="font-medium">Online</span>
                    </div>
                )}
            </div>
        </>
    );
};

export default MessageHeadBox;
