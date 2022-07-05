/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface INote {
  id: string;
  title: string;
  keywords: string[] | null;
  content: string;
}

const initialState = {
  notes: [
    {
      id: '741a8f39-7747-463e-a233-4f3dae8d638b',
      title: '노트 테스트',
      keywords: ['테스트 키워드', '테스트 키워드 2'],
      content: '노트 테스트',
    },
    {
      id: '741a2f39-sg24-2341-a233-4f3da234638b',
      title: '노트 테스트2',
      keywords: ['테스트 키워드', '테스트 키워드 2'],
      content: '노트 테스트2',
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
    deleteNote(state: { notes: INote[] }, action: { payload: { id: string } }) {
      state.notes = state.notes.filter((note) => {
        return note.id !== action.payload.id;
      });
    },
    editNote(state: { notes: INote[] }, action: { payload: INote }) {
      const noteIdx = state.notes.findIndex((note) => {
        return note.id === action.payload.id;
      });

      state.notes[noteIdx] = action.payload;
    },
  },
});

export const notesActions = notesSlice.actions;
export default notesSlice.reducer;
