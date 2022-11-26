import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalActive: false,
  modalMessage: "",
  modalType: "",
};

const options = {
  name: "modal",
  initialState,
  reducers: {
    showModal: (state) => {
      state.modalActive = true;
    },
    modifyModalInfo: (state, action) => {
      const { modalActive, modalMessage, modalType } = action.payload;
      state.modalActive = modalActive;
      state.modalMessage = modalMessage;
      state.modalType = modalType;
    },
    returnToInicialValuesModalInfo: (state) => {
      const { modalActive, modalMessage, modalType } = initialState;
      state.modalActive = modalActive;
      state.modalMessage = modalMessage;
      state.modalType = modalType;
    },
  },
};

const modalSlice = createSlice(options);

//* Exporting reducers
export const { modifyModalInfo, returnToInicialValuesModalInfo, showModal } =
  modalSlice.actions;

//* Selectors
export const selectModalStatus = (state) => state.modal.modalActive;
export const selectModalMessage = (state) => state.modal.modalMessage;
export const selectModalType = (state) => state.modal.modalType;

export default modalSlice.reducer;
