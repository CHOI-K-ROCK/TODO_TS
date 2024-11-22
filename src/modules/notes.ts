/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { INote } from 'types';

const getInitialState = () => {
  const savedNotes = window.localStorage.getItem('notesData');

  return {
    notes: savedNotes
      ? JSON.parse(savedNotes)
      : [
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
};

const initialState = getInitialState();

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    // 전체 업데이트
    setNotes(state: { notes: INote[] }, action: { payload: INote[] }) {
      state.notes = action.payload;
    },

    // 추가
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

    // 삭제
    deleteNote(state: { notes: INote[] }, action: { payload: { id: string } }) {
      state.notes = state.notes.filter((note) => {
        return note.id !== action.payload.id;
      });
    },

    // 수정
    updateNote(state: { notes: INote[] }, action: { payload: INote }) {
      const noteIdx = state.notes.findIndex((note) => {
        return note.id === action.payload.id;
      });

      state.notes[noteIdx] = action.payload;
    },
  },
});

export const notesActions = notesSlice.actions;
export default notesSlice.reducer;
