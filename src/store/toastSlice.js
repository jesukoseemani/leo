import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        toasts: [],
        position: "top-right" // top-right, top-left, bottom-right, bottom-left
    },
    reducers: {
        showToast: (state, action) => {
            const { id, message, type, position } = action.payload;
            const toast = {
                id,
                message,
                type,
            };
            state.position = position
            state.toasts = [...state.toasts, toast];
        },

        removeToast: (state, action) => {
            const filteredToast = state.toasts.filter((toast) => toast.id !== action.payload);
            state.toasts = filteredToast;
        },
    },
});

export default toastSlice;
