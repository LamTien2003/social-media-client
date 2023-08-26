/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseApi } from './../type/Response';
import { apiSlice } from './apiSlice';

import Conversation from '@/type/Conversation';

export const conversationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query<ResponseApi<Conversation[]>, void>({
            query: () => `conversation`,
        }),
        getConversation: builder.query<ResponseApi<Conversation>, string>({
            query: (conversationId) => `conversation/${conversationId}`,
        }),
    }),
});

export const { useGetConversationsQuery, useGetConversationQuery } = conversationApi;
