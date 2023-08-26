/* eslint-disable @typescript-eslint/no-explicit-any */
import Message from '@/type/Message';
import { ResponseApi } from './../type/Response';
import { apiSlice } from './apiSlice';

export const messageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query<ResponseApi<Message[]>, string>({
            query: (conversationId) => `message/${conversationId}`,
        }),
        sendMessage: builder.mutation<ResponseApi<Message>, { conversationId: string; content: string }>({
            query(body) {
                try {
                    return {
                        url: `message/${body.conversationId}`,
                        method: 'POST',
                        body: { content: body.content },
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
        }),
        readAllMessages: builder.mutation<ResponseApi<Message[]>, string>({
            query(conversationId) {
                try {
                    return {
                        url: `message/readAll/${conversationId}`,
                        method: 'PATCH',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
        }),
    }),
});

export const { useGetMessagesQuery, useSendMessageMutation, useReadAllMessagesMutation } = messageApi;
