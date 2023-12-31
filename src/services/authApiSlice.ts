/* eslint-disable @typescript-eslint/no-explicit-any */
import User from '@/type/User';
import { apiSlice } from './apiSlice';
import { ResponseApi } from '@/type/Response';

interface LoginRequest {
    email: string;
    password: string;
}
interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ResponseApi<User>, LoginRequest>({
            query(body) {
                try {
                    return {
                        url: 'auth/login',
                        method: 'POST',
                        body,
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
            invalidatesTags: (_result, error, _body) => {
                if (!error) {
                    return [{ type: 'Users', id: 'CURRENT' }];
                }
                return [];
            },
        }),
        loginGoogle: builder.mutation<ResponseApi<User>, void>({
            query() {
                try {
                    return {
                        url: 'auth/loginGoogle',
                        method: 'POST',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
            invalidatesTags: (_result, error, _body) => {
                if (!error) {
                    return [{ type: 'Users', id: 'CURRENT' }];
                }
                return [];
            },
        }),
        register: builder.mutation<ResponseApi<User>, RegisterRequest>({
            query(body) {
                try {
                    return {
                        url: 'auth/signup',
                        method: 'POST',
                        body,
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
        }),
        logout: builder.mutation<ResponseApi, void>({
            query() {
                try {
                    return {
                        url: 'auth/logout',
                        method: 'POST',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
        }),
    }),
});

export const { useLoginMutation, useLoginGoogleMutation, useRegisterMutation, useLogoutMutation } = authApi;
