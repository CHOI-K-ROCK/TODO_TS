/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface IModal {
  isOpen?: boolean;
  msg: string | null;
  type: 'double' | 'single' | null;
  applyFn: any;
}

const initialState = {
  isOpen: false,
  msg: null,
  type: null,
  applyFn: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state: IModal, action: { payload: IModal }) {
      state.isOpen = true;
      state.msg = action.payload.msg;
      state.type = action.payload.type;
      state.applyFn = action.payload.applyFn;
    },
    closeModal(state: IModal) {
      state.isOpen = false;
      state.msg = null;
      state.type = null;
      state.applyFn = null;
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
