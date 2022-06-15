/* eslint-disable no-param-reassign */
import { createSlice, current } from '@reduxjs/toolkit';

interface ITodo {
  id: string;
  done: boolean;
  content: string;
}

const initialState = {
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // 로컬 스토리지 가져오기
    getLocalStorage(state: { todos: ITodo[] }) {
      const localData = window.localStorage.getItem('data') as string;
      state.todos = JSON.parse(localData);
    },
    // 추가
    addTodo(state: { todos: ITodo[] }, action: { payload: ITodo }) {
      state.todos = [
        ...state.todos,
        {
          id: action.payload.id,
          done: action.payload.done,
          content: action.payload.content,
        },
      ];
    },
    doneTodo(state: { todos: ITodo[] }, action: { payload: { id: string } }) {
      state.todos = [...state.todos];
    },

    // 삭제
    // 수정
    // 완료 되돌리기
    // 완료 삭제
    // 완료 전체 삭제
  },
});

export const todosActions = todosSlice.actions;
export default todosSlice.reducer;

console.log(todosSlice);
