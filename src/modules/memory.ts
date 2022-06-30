/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface INote {
  id: string;
  title: string;
  keywords: string[] | null;
  content: string;
}

const initialState = {
  notes: [],
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
    deleteNote(state: { notes: INote[] }, action: { payload: { id: string } }) {
      state.notes = state.notes.filter((note) => {
        return note.id !== action.payload.id;
      });
    },
    editNote(state: { notes: INote[] }, action: { payload: INote }) {
      console.log(action.payload);
    },
  },
});

export const notesActions = notesSlice.actions;
export default notesSlice.reducer;
