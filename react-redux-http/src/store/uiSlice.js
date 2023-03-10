import { createSlice } from "@reduxjs/toolkit"

const initialUIState = { isCartVisible: false, notification: null };

const uiSlice = createSlice({
    name: "ui",
    initialState: initialUIState,
    reducers: {
        toggle(state) { state.isCartVisible = !state.isCartVisible },
        showNotification(state, action)
        {
            state.notification = { status: action.payload.status, title: action.payload.title, message: action.payload.message }
        },
    }
});

const uiActions = uiSlice.actions;

export { uiSlice, uiActions };

