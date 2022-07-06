/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  name: '',
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal(
      state: { isOpen: boolean; name: string },
      action: { payload: string }
    ) {
      state.isOpen = true;
      state.name = action.payload;
    },
  },
});

export const modalsAction = modalsSlice.actions;
export default modalsSlice.reducer;
