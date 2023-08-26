import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MessageItem from './components/MessageItem';
import { RootState, useAppDispatch } from '@/store/store';
import { leaveMessageRoom, seenConversation } from '@/store/sideSlice';
import { useGetMessagesQuery, useReadAllMessagesMutation } from '@/services/messageApiSlice';
import Loading from '../Loading/Loading';
import { useGetConversationQuery } from '@/services/conversationApiSlice';

import MessageHeadBox from './components/MessageHeadBox';
import MessageFootBox from './components/MessageFootBox';
import { useCallback, useEffect, useRef, useState } from 'react';
import { socket } from '@/services/socket';
import Message from '@/type/Message';
import TypingBox from './components/TypingBox';

import { useSelector } from 'react-redux';

interface UserTyping {
    id: string;
    firstName: string;
    lastName: string;
    photo: string;
}
interface Props {
    conversationId: string;
}

const MessageBox = (props: Props) => {
    const { conversationId } = props;
    const currentUser = useSelector((state: RootState) => state.user.user);
    const { data: messagesData, isLoading: messageLoading } = useGetMessagesQuery(conversationId, {
        refetchOnMountOrArgChange: true,
    });
    const { data: conversationData, isLoading: conversationLoading } = useGetConversationQuery(conversationId);
    const [triggerReadAll] = useReadAllMessagesMutation();
    const [messages, setMessages] = useState<Message[]>([]);
    const [usersTyping, setUsersTyping] = useState<UserTyping[]>([]);
    const thisBox = useRef(null);

    const dispatch = useAppDispatch();

    const handleTypingUsers = useCallback(
        (user: UserTyping) => {
            const isExist = usersTyping.some((item) => {
                return item.id === user.id;
            });
            if (!isExist) {
                setUsersTyping((prev) => [user, ...prev]);
            }
        },
        [usersTyping],
    );
    const handleStopTypingUsers = useCallback(
        (user: UserTyping) => {
            const isExist = usersTyping.some((item) => {
                return item.id === user.id;
            });
            if (isExist) {
                setUsersTyping((prev) => prev.filter((item) => item.id !== user.id));
            }
        },
        [usersTyping],
    );
    const handleLeaveRoom = (id: string) => {
        dispatch(leaveMessageRoom(id));
    };

    useEffect(() => {
        setMessages(messagesData?.data?.data || []);
    }, [messagesData]);

    // =====> HANDLE CLICK BOX TO READ ALL MESSAGES
    useEffect(() => {
        const handleClickBox = async () => {
            try {
                const isRead = !!messages[0]?.readBy?.includes(currentUser?.id as string);
                if (!isRead) {
                    const response = await triggerReadAll(conversationId).unwrap();
                    if (response.status !== 200 || response?.data?.status !== 'success') {
                        throw response;
                    }
                    // Set all messages in state to be read
                    setMessages((prev) => {
                        return [...prev].map((item) => {
                            if (!item.readBy.includes(currentUser?.id as string)) {
                                const newObject = { ...item, readBy: [...item.readBy, currentUser?.id] } as Message;
                                return newObject;
                            }
                            return item;
                        });
                    });
                    // Dispatch to change notifi of conversation in Header and messageBar
                    dispatch(seenConversation({ conversationId, currentUserId: currentUser?.id as string }));
                }
            } catch (err: any) {
                console.log(err);
            }
        };
        thisBox.current && (thisBox.current as HTMLDivElement).addEventListener('click', handleClickBox);

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            thisBox?.current && (thisBox.current as HTMLDivElement).removeEventListener('click', handleClickBox);
        };
    }, [conversationId, currentUser?.id, dispatch, messages, triggerReadAll]);

    useEffect(() => {
        socket.emit('joinRoom', conversationId);
    }, [conversationId]);

    useEffect(() => {
        const handleMessageReceived = (message: Message) => {
            setMessages((prev) => [message, ...prev]);
        };

        socket.on('messageReceived', handleMessageReceived);
        socket.on('typing', handleTypingUsers);
        socket.on('stopTyping', handleStopTypingUsers);

        return () => {
            socket.off('messageReceived', handleMessageReceived);
            socket.off('typing', handleTypingUsers);
            socket.off('stopTyping', handleStopTypingUsers);
        };
    }, [handleStopTypingUsers, handleTypingUsers]);
    return (
        <div
            className={`relative w-[320px] h-full flex flex-col justify-evenly bg-white shadow-lg rounded-md ${
                !messages[0]?.readBy?.includes(currentUser?.id as string) && 'bg-red-50 shadow-red-300'
            }`}
            ref={thisBox}
        >
            <div className="p-3 flex space-x-2 border-b border-b-light-300">
                {conversationLoading ? (
                    <Loading />
                ) : (
                    conversationData?.data?.data && <MessageHeadBox data={conversationData?.data?.data} />
                )}
            </div>
            <div className="flex-1 flex flex-col-reverse space-y-4 space-y-reverse overflow-y-scroll p-4 ">
                {!!usersTyping.length && <TypingBox usersTyping={usersTyping} />}

                {messageLoading ? <Loading /> : messages.map((item) => <MessageItem data={item} key={item.id} />)}
            </div>
            <MessageFootBox conversationId={conversationData?.data?.data?.id as string} setMessages={setMessages} />

            <FontAwesomeIcon
                icon={faX}
                className="absolute top-5 right-5 w-4 h-4 text-content-300 cursor-pointer"
                onClick={() => handleLeaveRoom(conversationId)}
            />
        </div>
    );
};

export default MessageBox;
