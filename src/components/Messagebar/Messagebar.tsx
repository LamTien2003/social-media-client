import Search from '@/components/Search/Search';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useMemo } from 'react';

import { useGetConversationsQuery } from '@/services/conversationApiSlice';
import Loading from '../Loading/Loading';
import MessagebarItem from './components/MessagebarItem';

interface Props {
    style?: React.CSSProperties;
}

const Messagebar = (props: Props) => {
    const { style } = props;
    // It will auto dispatch in extraReducer when matchFullfiled
    const { isLoading } = useGetConversationsQuery();
    const conversations = useSelector((state: RootState) => state.side.conversations);
    const onlineFriends = useSelector((state: RootState) => state.side.onlineFriends);

    const conversationList = useMemo(() => {
        if (!conversations) return [];

        const conversationsWithOnlineStatus = conversations.map((conversation) => {
            const isOnline = conversation.members.some((member) =>
                onlineFriends.some((friend) => friend.userId === member.id),
            );
            return { ...conversation, isOnline };
        });

        return conversationsWithOnlineStatus?.sort((a, b) => Number(b.isOnline) - Number(a.isOnline));
    }, [conversations, onlineFriends]);

    // const friendList = useMemo(() => {
    //     const users = user?.friends.map((friend) => {
    //         const isOnline = onlineFriends.some((onlineFriend) => onlineFriend.userId === friend.id);
    //         return { ...friend, isOnline };
    //     });
    //     return users?.sort((a, b) => Number(b.isOnline) - Number(a.isOnline));
    // }, [onlineFriends, user?.friends]);
    return (
        <motion.div
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: 400, opacity: 0 }}
            transition={{ ease: 'linear', duration: 0.25 }}
            className=" fixed top-[80px] bottom-3 right-0 w-[260px] min-h-[90vh] bg-white dark:bg-dark-500 p-4 border border-content-100 dark:border-none mobile:hidden rounded-lg overflow-y-scroll transition-all "
            style={{ ...style }}
        >
            <Search className="mb-2 py-1" />
            <h3 className="text-xs font-bold text-content-200 mb-4">Contacts</h3>
            <div className="flex flex-col items-start">
                {isLoading ? (
                    <Loading />
                ) : (
                    conversationList?.map((item) => <MessagebarItem data={item} key={item.id} />)
                )}
            </div>
        </motion.div>
    );
};

export default Messagebar;
