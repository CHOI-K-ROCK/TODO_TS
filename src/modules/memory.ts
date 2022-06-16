/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface INote {
  id: string;
  title: string;
  keywords: string[];
  content: string;
}

const initialState = {
  notes: [
    {
      id: 'string',
      title: 'string',
      keywords: ['a', 'b'],
      content: 'content',
    },
    {
      id: 'string',
      title: 'string',
      keywords: ['a', 'b'],
      content: 'content',
    },
  ],
};

const notesSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    getLocalStorage(state: { notes: INote[] }) {
      const localData = window.localStorage.getItem('notesData') as string;
      state.notes = JSON.parse(localData);
    },
    addNote(state: { notes: INote[] }, action: { payload: INote }) {
      state.notes = [
        ...state.notes,
        {
          id: action.payload.id,
          title: action.payload.title,
          keywords: action.payload.keywords,
          content: action.payload.content,
        },
      ];
    },
  },
});

export const notesActions = notesSlice.actions;
export default notesSlice.reducer;
