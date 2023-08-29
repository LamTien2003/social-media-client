/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseApi } from './../type/Response';
import { apiSlice } from './apiSlice';

import Conversation from '@/type/Conversation';

export const conversationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query<ResponseApi<Conversation[]>, void>({
            query: () => `conversation`,
            providesTags(result) {
                if (result?.data?.data) {
                    const final = [
                        ...result.data.data.map(({ id }) => ({ type: 'Conversations' as const, id })),
                        { type: 'Conversations' as const, id: 'LIST' },
                    ];
                    return final;
                }
                return [{ type: 'Conversations' as const, id: 'LIST' }];
            },
        }),
        getConversation: builder.query<ResponseApi<Conversation>, string>({
            query: (conversationId) => `conversation/${conversationId}`,
        }),
    }),
});

export const { useGetConversationsQuery, useGetConversationQuery } = conversationApi;
