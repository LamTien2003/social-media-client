import Loading from '@/components/Loading/Loading';
import { useSendMessageMutation } from '@/services/messageApiSlice';
import { socket } from '@/services/socket';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import Message from '@/type/Message';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface Props {
    conversationId: string;
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}
const MessageFootBox = (props: Props) => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const { conversationId, setMessages } = props;
    const [sendMessage, { isLoading }] = useSendMessageMutation();
    const [text, setText] = useState<string>('');
    const textRef = useRef<HTMLDivElement>(null);

    const handleEmitTyping = (type: 'typing' | 'stopTyping') => {
        socket.emit(type, {
            conversationId,
            sender: {
                id: currentUser?.id,
                firstName: currentUser?.firstName,
                lastName: currentUser?.lastName,
                photo: currentUser?.photo,
            },
        });
    };
    const handleTextChange: React.KeyboardEventHandler<HTMLInputElement> = async (e) => {
        try {
            if (text !== '' && e.keyCode === 13 && e.key === 'Enter') {
                // PreventDefault để chặn div contentable xuất hiện khoảng cách
                e.preventDefault();
                await handleSubmitChat();
                handleEmitTyping('stopTyping');
                return;
            }

            const target = e.target as HTMLDivElement;
            const value = target.innerText;
            setText(value);
            value === '' ? handleEmitTyping('stopTyping') : handleEmitTyping('typing');
        } catch (err: any) {
            toast.warn(err?.msg);
        }
    };
    const handleSubmitChat = async () => {
        try {
            const response = await sendMessage({ conversationId, content: text }).unwrap();
            if (response.status !== 200 || response?.data?.status !== 'success') {
                throw response;
            }
            const message = response.data.data as Message;
            socket.emit('sendingMessage', message);
            setMessages((prev) => [message, ...prev]);
            setText('');
            (textRef?.current as HTMLDivElement).innerText = '';
        } catch (err: any) {
            toast.warn(err?.msg);
        }
    };
    return (
        <div className="flex items-center space-x-1 border-t border-t-light-300 p-4">
            <div
                className="w-11/12 min-h-[34px] px-4 py-2 bg-light-300 rounded-2xl outline-none text-content-300 text-xs"
                contentEditable
                placeholder="Nhập văn bản"
                ref={textRef}
                onKeyUp={handleTextChange}
            ></div>
            {isLoading ? <Loading /> : <FontAwesomeIcon icon={faPaperPlane} className=" w-4 h-4 text-content-300" />}
        </div>
    );
};

export default MessageFootBox;
