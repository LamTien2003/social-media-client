import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { conversationApi } from '@/services/conversationApiSlice';
import { notificationApi } from '@/services/notificationApiSlice';

import Conversation from '@/type/Conversation';
import Message from '@/type/Message';
import Notification from '@/type/Notification';

export interface InitialValue {
    onlineFriends: { userId: string; socketId: string }[];
    messageRoomJoined: string[];
    conversations: Conversation[];
    notifications: Notification[];
}
const initialState: InitialValue = {
    onlineFriends: [],
    messageRoomJoined: [],
    conversations: [],
    notifications: [],
};
const sideSlice = createSlice({
    name: 'side',
    initialState,
    reducers: {
        changeOnlineFriends: (state, action: PayloadAction<{ userId: string; socketId: string }[]>) => {
            state.onlineFriends = action.payload;
        },
        joinMessageRoom: (state, action: PayloadAction<string>) => {
            state.messageRoomJoined = [...state.messageRoomJoined, action.payload];
        },
        leaveMessageRoom: (state, action: PayloadAction<string>) => {
            state.messageRoomJoined = state.messageRoomJoined.filter((item) => item !== action.payload);
        },
        setConversations: (state, action: PayloadAction<Conversation[]>) => {
            state.conversations = action.payload;
        },
        updateLastMessage: (state, action: PayloadAction<Message>) => {
            state.conversations = [...state.conversations].map((item) => {
                if (item.id === action.payload.conversation) {
                    return { ...item, latestMessage: action.payload };
                }
                return item;
            });
        },
        seenConversation: (state, action: PayloadAction<{ conversationId: string; currentUserId: string }>) => {
            const { conversationId, currentUserId } = action.payload;

            state.conversations = state.conversations.map((item) => {
                if (item.id === conversationId) {
                    if (item?.latestMessage && !item?.latestMessage?.readBy.includes(currentUserId)) {
                        const newLastestMessage = {
                            ...item.latestMessage,
                            readBy: [...item.latestMessage.readBy, currentUserId],
                        } as Message;
                        return { ...item, latestMessage: newLastestMessage };
                    }
                }
                return item;
            });
        },

        setNotifications: (state, action: PayloadAction<Notification[]>) => {
            state.notifications = action.payload;
        },
        addNotification: (state, action: PayloadAction<Notification>) => {
            state.notifications = [...state.notifications, action.payload];
        },
        changeSeenNotification: (state, action: PayloadAction<string>) => {
            state.notifications = [...state.notifications].map((item) => {
                if (item.id === action.payload) {
                    return { ...item, isSeen: true };
                }
                return item;
            });
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(conversationApi.endpoints.getConversations.matchFulfilled, (state, { payload }) => {
            state.conversations = payload.data.data as Conversation[];
        });
        builder.addMatcher(notificationApi.endpoints.getNotifications.matchFulfilled, (state, { payload }) => {
            state.notifications = payload.data.data as Notification[];
        });
    },
});

export const {
    changeOnlineFriends,
    joinMessageRoom,
    leaveMessageRoom,
    setConversations,
    updateLastMessage,
    setNotifications,
    addNotification,
    seenConversation,
    changeSeenNotification,
} = sideSlice.actions;
export default sideSlice.reducer;
