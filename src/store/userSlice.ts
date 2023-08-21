import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import User from '@/type/User';
import { authApi } from '@/services/authApiSlice';
import { userApi } from '@/services/userApiSlice';

export interface InitialValue {
    user: User | null | undefined;
    accessToken: string | null | undefined;
}
const initialState: InitialValue = {
    user: null,
    accessToken: null,
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setcredentialsToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setCurrentUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.user = payload.data.data;
            state.accessToken = payload.data.accessToken;
        });
        builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state, { payload }) => {
            state.user = payload.data.data;
            state.accessToken = payload.data.accessToken;
        });
        builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state, { payload }) => {
            state.user = null;
            state.accessToken = null;
        });
        builder.addMatcher(userApi.endpoints.getCurrentUser.matchFulfilled, (state, { payload }) => {
            state.user = payload.data.data;
        });
    },
});

export const { setcredentialsToken, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
