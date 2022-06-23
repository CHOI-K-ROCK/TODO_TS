/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface INote {
  id: string;
  title: string;
  keywords?: string[];
  content: string;
}

const initialState = {
  notes: [
    {
      id: '2108fb0-83003h4-23124f4',
      title: '호이스팅과 TDZ의 상관관계',
      keywords: ['호이스팅', '실행 컨텍스트', '선언 초기화 할당'],
      content: '호 이스팅은정말즐거워 상병님!',
    },
    {
      id: '2affsb0-skd20sd03h4-239asg4',
      title: '자바스크립트의 자료형',
      keywords: ['원시자료형', '참조자료형'],
      content: '원시는 콜스택, 참조는 힙메모리',
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
