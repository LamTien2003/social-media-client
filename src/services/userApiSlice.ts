/* eslint-disable @typescript-eslint/no-explicit-any */
import User from '@/type/User';
import { apiSlice } from './apiSlice';
import { ResponseApi } from '@/type/Response';

interface FriendSuggest {
    id: string;
    firstName: string;
    lastName: string;
    photo: string;
    commonFriends: number;
}
export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSuggestFriends: builder.query<ResponseApi<FriendSuggest[]>, void>({
            query: () => `user/suggestFriends?limit=3`,
            providesTags(result) {
                if (result?.data?.data) {
                    const final = [
                        ...result.data.data.map(({ id }) => ({ type: 'Users' as const, id })),
                        { type: 'Users' as const, id: 'SUGGEST' },
                    ];
                    return final;
                }
                return [{ type: 'Users' as const, id: 'SUGGEST' }];
            },
        }),
        getUsers: builder.query<ResponseApi<User[]>, { q?: string }>({
            query: (arg) => {
                const { q } = arg;
                return {
                    url: 'user/',
                    params: { q },
                };
            },
            providesTags(result) {
                if (result?.data?.data) {
                    const final = [
                        ...result.data.data.map(({ id }) => ({ type: 'Users' as const, id })),
                        { type: 'Users' as const, id: 'LIST' },
                    ];
                    return final;
                }
                return [{ type: 'Users' as const, id: 'LIST' }];
            },
        }),
        getUser: builder.query<ResponseApi<User>, string>({
            query: (id: string) => `user/${id}`,
            providesTags(result) {
                if (result?.data?.data) {
                    return [{ type: 'Users' as const, id: result?.data?.data.id }];
                }
                return [{ type: 'Users' as const, id: 'CURRENT' }];
            },
        }),
        getCurrentUser: builder.query<ResponseApi<User>, string>({
            query: () => `user/getMe`,
            providesTags(result) {
                if (result?.data?.data) {
                    return [
                        { type: 'Users' as const, id: result.data.data.id },
                        { type: 'Users' as const, id: 'CURRENT' },
                    ];
                }
                return [{ type: 'Users' as const, id: 'CURRENT' }];
            },
        }),
        acceptFriend: builder.mutation<ResponseApi, string>({
            query(body) {
                try {
                    return {
                        url: `user/friendRequest/${body}`,
                        method: 'POST',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },

            invalidatesTags: (_result, error, body) => {
                if (error) {
                    return [];
                } else {
                    return [
                        { type: 'Users', id: body },
                        { type: 'Users', id: 'CURRENT' },
                    ];
                }
            },
        }),
        removeFriend: builder.mutation<ResponseApi, string>({
            query(body) {
                try {
                    return {
                        url: `user/friend/${body}`,
                        method: 'DELETE',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },

            invalidatesTags: (_result, error, body) => {
                if (error) {
                    return [];
                } else {
                    return [
                        { type: 'Users', id: body },
                        { type: 'Users', id: 'CURRENT' },
                    ];
                }
            },
        }),
        sendFriendRequest: builder.mutation<ResponseApi, string>({
            query(body) {
                try {
                    return {
                        url: `user/friend/${body}`,
                        method: 'POST',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },

            invalidatesTags: (_result, error, body) => {
                if (!error) {
                    return [
                        { type: 'Users', id: body },
                        { type: 'Users', id: 'SUGGEST' },
                        { type: 'Users', id: 'CURRENT' },
                    ];
                }
                return [];
            },
        }),
        cancelFriendRequest: builder.mutation<ResponseApi, string>({
            query(body) {
                try {
                    return {
                        url: `user/friendRequest/${body}`,
                        method: 'DELETE',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },

            invalidatesTags: (_result, error, body) => {
                if (!error) {
                    return [
                        { type: 'Users', id: body },
                        { type: 'Users', id: 'SUGGEST' },
                        { type: 'Users', id: 'CURRENT' },
                    ];
                }
                return [];
            },
        }),
        changeMe: builder.mutation<ResponseApi<User>, FormData>({
            query(body) {
                try {
                    return {
                        url: `user/changeMe`,
                        method: 'PATCH',
                        body,
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },

            invalidatesTags: (result, error, _body) => {
                if (!error) {
                    return [
                        { type: 'Users', id: result?.data?.data?.id },

                        { type: 'Users', id: 'CURRENT' },
                    ];
                }
                return [];
            },
        }),
        banUser: builder.mutation<ResponseApi, string>({
            query(body) {
                try {
                    return {
                        url: `user/ban/${body}`,
                        method: 'POST',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },

            invalidatesTags: (_result, error, body) => {
                if (!error) {
                    return [
                        { type: 'Users', id: body },
                        { type: 'Users', id: 'SUGGEST' },
                        { type: 'Users', id: 'CURRENT' },
                        { type: 'Users', id: 'LIST' },
                        { type: 'Posts', id: 'LIST' },
                        { type: 'Reports', id: 'LIST' },
                    ];
                }
                return [];
            },
        }),
        unbanUser: builder.mutation<ResponseApi, string>({
            query(body) {
                try {
                    return {
                        url: `user/unban/${body}`,
                        method: 'POST',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },

            invalidatesTags: (_result, error, body) => {
                if (!error) {
                    return [
                        { type: 'Users', id: body },
                        { type: 'Users', id: 'SUGGEST' },
                        { type: 'Users', id: 'CURRENT' },
                        { type: 'Users', id: 'LIST' },
                        { type: 'Posts', id: 'LIST' },
                        { type: 'Reports', id: 'LIST' },
                    ];
                }
                return [];
            },
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useGetCurrentUserQuery,
    useGetSuggestFriendsQuery,
    useAcceptFriendMutation,
    useRemoveFriendMutation,
    useSendFriendRequestMutation,
    useCancelFriendRequestMutation,
    useChangeMeMutation,
    useBanUserMutation,
    useUnbanUserMutation,
} = userApi;
