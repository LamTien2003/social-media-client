import { RootState } from '@/store/store';
import Message from '@/type/Message';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
interface Props {
    data: Message;
}
const MessageItem = (props: Props) => {
    const { data } = props;
    const currentUser = useSelector((state: RootState) => state.user.user);

    const isMine = useMemo(() => {
        return currentUser?.id === data?.sender.id;
    }, [currentUser?.id, data?.sender.id]);

    return (
        <div className={`flex ${isMine && 'justify-end'}`}>
            <div className={`max-w-[80%] flex space-x-2 items-end ${isMine && 'flex-row-reverse space-x-reverse'}`}>
                <img src={data.sender.photo} alt="" className="w-7 h-7 rounded-full object-cover mb-2" />

                <div
                    className={`flex-1 ${
                        isMine ? 'bg-orange-50 text-neutral-500' : 'bg-blue-100 text-blue-500'
                    } text-xs font-semibold rounded-xl  p-4 `}
                >
                    {data.content}
                </div>
            </div>
        </div>
    );
};

export default MessageItem;
