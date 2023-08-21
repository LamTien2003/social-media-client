/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseApi } from './../type/Response';
import Post from '@/type/Post';
import { apiSlice } from './apiSlice';

export const postApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query<ResponseApi<Post[]>, void>({
            query: () => `post`,
            providesTags(result) {
                if (result?.data?.data) {
                    const final = [
                        ...result.data.data.map(({ id }) => ({ type: 'Posts' as const, id })),
                        { type: 'Posts' as const, id: 'LIST' },
                    ];
                    return final;
                }
                return [{ type: 'Posts' as const, id: 'LIST' }];
            },
        }),
        getPostsOfUser: builder.query<ResponseApi<Post[] | []>, string>({
            query: (body) => `post/user/${body}`,
            providesTags(result) {
                if (result?.data?.data) {
                    const final = [
                        ...result.data.data.map(({ id }) => ({ type: 'Posts' as const, id })),
                        { type: 'Posts' as const, id: 'LIST' },
                    ];
                    return final;
                }
                return [{ type: 'Posts' as const, id: 'LIST' }];
            },
        }),
        addPost: builder.mutation<ResponseApi<Post>, FormData>({
            query(body) {
                try {
                    return {
                        url: 'post',
                        method: 'POST',
                        body,
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },

            invalidatesTags: (_result, error, _body) => (error ? [] : [{ type: 'Posts', id: 'LIST' }]),
        }),
        removePost: builder.mutation<ResponseApi<Post>, string>({
            query(body) {
                try {
                    return {
                        url: `post/${body}/remove`,
                        method: 'DELETE',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },

            invalidatesTags: (_result, error, body) =>
                error
                    ? []
                    : [
                          { type: 'Posts', id: 'LIST' },
                          { type: 'Posts', id: body },
                          { type: 'Reports' as const, id: 'LIST' },
                      ],
        }),
        restorePost: builder.mutation<ResponseApi<Post>, string>({
            query(body) {
                try {
                    return {
                        url: `post/${body}/restore`,
                        method: 'POST',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },

            invalidatesTags: (_result, error, body) =>
                error
                    ? []
                    : [
                          { type: 'Posts', id: 'LIST' },
                          { type: 'Posts', id: body },
                          { type: 'Reports' as const, id: 'LIST' },
                      ],
        }),
        commentPost: builder.mutation<ResponseApi<Comment>, { id: string; formData: FormData }>({
            query(body) {
                try {
                    return {
                        url: `post/${body.id}/comment`,
                        method: 'POST',
                        body: body.formData,
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },

            invalidatesTags: (_result, error, body) => (error ? [] : [{ type: 'Posts', id: body.id }]),
        }),
        reactionPost: builder.mutation<ResponseApi<Post>, { id: string; emotion: string }>({
            query(body) {
                try {
                    const payload = { emotion: body.emotion };
                    return {
                        url: `post/react/${body.id}`,
                        method: 'POST',
                        body: payload,
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },

            invalidatesTags: (_result, error, body) => (error ? [] : [{ type: 'Posts', id: body.id }]),
        }),
        removeReactionPost: builder.mutation<ResponseApi<Post>, string>({
            query(body) {
                try {
                    return {
                        url: `post/removeReact/${body}`,
                        method: 'POST',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },

            invalidatesTags: (_result, error, body) => (error ? [] : [{ type: 'Posts', id: body }]),
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetPostsOfUserQuery,
    useAddPostMutation,
    useCommentPostMutation,
    useReactionPostMutation,
    useRemoveReactionPostMutation,
    useRemovePostMutation,
    useRestorePostMutation,
} = postApi;
