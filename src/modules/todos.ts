/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface ITodo {
  id: string;
  done: boolean;
  content: string;
}

const initialState = {
  todos: [
    {
      id: 'dc3d07a0-57c3-4bc1-a25e-d5f46f0db06f',
      done: false,
      content: 'todo example',
    },
    {
      id: '0fec7384-fd31-462f-8df2-4cc48b31fd3c',
      done: true,
      content: 'done example',
    },
  ],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // 로컬 스토리지 가져오기
    getLocalStorage(state: { todos: ITodo[] }) {
      const localData = window.localStorage.getItem('todosData') as string;
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
    // 완료 상태 토글
    toggleTodoStatus(
      state: { todos: ITodo[] },
      action: { payload: { id: string } }
    ) {
      const idx = state.todos.findIndex(
        (todo: ITodo) => todo.id === action.payload.id
      );

      state.todos[idx].done = !state.todos[idx].done;
    },
    // 삭제
    deleteTodo(state: { todos: ITodo[] }, action: { payload: { id: string } }) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    // 수정
    editTodo(
      state: { todos: ITodo[] },
      action: { payload: { id: string; content: string } }
    ) {
      const idx = state.todos.findIndex(
        (todo: ITodo) => todo.id === action.payload.id
      );
      state.todos[idx].content = action.payload.content;
    },

    // 완료목록 전체 삭제
    clearDoneList(state: { todos: ITodo[] }) {
      state.todos = state.todos.filter((todo) => !todo.done);
    },
  },
});

export const todosActions = todosSlice.actions;
export default todosSlice.reducer;
