import { ResponseApi } from './../type/Response';
import { apiSlice } from './apiSlice';

import Report from '@/type/Report';

export const reportApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReports: builder.query<ResponseApi<Report[]>, void>({
            query: () => `report`,
            providesTags(result) {
                if (result?.data?.data) {
                    const final = [
                        ...result.data.data.map(({ id }) => ({ type: 'Reports' as const, id })),
                        { type: 'Reports' as const, id: 'LIST' },
                    ];
                    return final;
                }
                return [{ type: 'Reports' as const, id: 'LIST' }];
            },
        }),
        reportPost: builder.mutation<ResponseApi, { id: string; reason: string }>({
            query(body) {
                try {
                    const payload = { reason: body.reason };
                    return {
                        url: `report/${body.id}`,
                        method: 'POST',
                        body: payload,
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },

            invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Reports', id: body.id }]),
        }),
    }),
});

export const { useGetReportsQuery, useReportPostMutation } = reportApi;
