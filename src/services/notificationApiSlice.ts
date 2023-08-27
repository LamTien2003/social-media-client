/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseApi } from './../type/Response';
import { apiSlice } from './apiSlice';

import Notification from '@/type/Notification';

export const notificationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query<ResponseApi<Notification[]>, void>({
            query: () => `notification`,
        }),
        seenNotification: builder.mutation<ResponseApi<Notification>, string>({
            query(notificationId) {
                try {
                    return {
                        url: `notification/seen/${notificationId}`,
                        method: 'PATCH',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
        }),
    }),
});

export const { useGetNotificationsQuery, useSeenNotificationMutation } = notificationApi;
