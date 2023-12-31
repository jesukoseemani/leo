import { createSlice } from "@reduxjs/toolkit"


const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isModalOpen: false,
        isModalType: "",
        isModalProps: {}
    },
    reducers: {
        openModal: (state, action) => {
            const { isModalOpen, isModalType, isModalProps } = action.payload;
            state.isModalOpen = isModalOpen;
            state.isModalType = isModalType;
            state.isModalProps = isModalProps;

        },
        closeModal: (state) => {
            state.isModalOpen = false;
            state.isModalType = "";
            state.isModalProps = {};
        },
    },
})

export const { openModal, closeModal } = modalSlice.actions


export default modalSlice
