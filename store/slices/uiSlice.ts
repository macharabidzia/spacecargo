import { createSlice } from '@reduxjs/toolkit';

interface UIState {
    isMobileMenuOpen: boolean;
}

const initialState: UIState = {
    isMobileMenuOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleMobileMenu: (state) => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
    },
});

export const { toggleMobileMenu } = uiSlice.actions;
export default uiSlice.reducer;