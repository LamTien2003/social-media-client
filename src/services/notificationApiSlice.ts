/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseApi } from './../type/Response';
import { apiSlice } from './apiSlice';

import Notification from '@/type/Notification';

export const notificationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query<ResponseApi<Notification[]>, void>({
            query: () => `notification`,
        }),
    }),
});

export const { useGetNotificationsQuery } = notificationApi;
