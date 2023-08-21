import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface InitialValue {
    isDark: boolean;
    isMinimal: boolean;
}
const initialState: InitialValue = {
    isDark: false,
    isMinimal: false,
};
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDark = action.payload;
        },
        toggleMinimalMode: (state, action: PayloadAction<boolean>) => {
            state.isMinimal = action.payload;
        },
    },
});

export const { toggleDarkMode, toggleMinimalMode } = themeSlice.actions;
export default themeSlice.reducer;
