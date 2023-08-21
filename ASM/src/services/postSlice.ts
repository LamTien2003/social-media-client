import { apiSlice } from './apiSlice';

export const postApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchPosts: builder.query<any, void>({
            query: () => `post`,
        }),
    }),
});

export const { useFetchPostsQuery } = postApi;
