import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import { useDispatch, useSelector } from 'react-redux';
import { todosActions } from 'modules/todos';

import MenuBar from 'components/MenuBar';
import TodoList from 'components/Todo/TodoList';
import Memory from 'components/Memory/Memory';
import { notesActions } from 'modules/memory';

const GlobalStyles = createGlobalStyle`
    ${reset}

    body * {
      font-family: 'NanumSquareRound';
    }

    a {
      color: #000;
    }
  `;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
`;

const InnerContainer = styled.section`
  width: 60%;
  max-width: 1000px;

  display: flex;
  align-items: center;
  flex-direction: column;

  position: relative;
  top: 20%;

  @media screen and (max-width: 750px) {
    width: 80%;
  }
`;

const Title = styled.section`
  font-family: 'NanumGothicCodingLigature';

  width: 100%;

  font-size: 3rem;
  text-align: center;
  letter-spacing: 0.1rem;
`;

interface ITodo {
  id: string;
  done: boolean;
  content: string;
}

interface INote {
  id: string;
  title: string;
  tags: string[];
  content: string;
}

function App(): JSX.Element {
  const nav = useNavigate();
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  // const [todoList, setTodoList] = useState<
  //   { id: string; done: boolean; content: string }[]
  // >([]);

  // Redux 적용 예정이지만 일단 기본적인 내용은 전부 완성 뒤에 적용시키기!
  const todoSlice = useSelector(
    (state: { todosSlice: { todos: ITodo[] } }) => state.todosSlice.todos
  );

  const notesSlice = useSelector(
    (state: { notesSlice: { notes: INote[] } }) => state.notesSlice.notes
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const todosData: string | null = window.localStorage.getItem('todosData');
    const notesData: string | null = window.localStorage.getItem('notesData');

    if (todosData) dispatch(todosActions.getLocalStorage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (notesData) dispatch(notesActions.getLocalStorage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 페이지를 불러 올 때 데이터가 있는 경우 todoList 의 값을 해당 JSON 을 객체로 파싱한 값으로 갱신한다.

  useEffect(() => {
    window.localStorage.setItem('todosData', JSON.stringify(todoSlice));
  }, [todoSlice]);

  useEffect(() => {
    window.localStorage.setItem('notesData', JSON.stringify(notesSlice));
  }, [notesSlice]);
  // 상태가 변경될 때 해당 내용을 로컬 스토리지에 저장한다.
  // 위 두 Effect Hook 으로 인해 서버없이도 브라우저에 저장된다.

  useEffect(() => {
    if (window.location.pathname === '/') nav('/todo');
    if (window.location.pathname === '/todo_typescript/') nav('/todo');
  }, [nav]);

  return (
    <Container>
      <GlobalStyles />
      <InnerContainer>
        <Title>&lt; memoryTodo /&gt;</Title>
        <MenuBar />
        <Routes>
          <Route
            path="todo"
            element={<TodoList todoList={todoList} setTodoList={setTodoList} />}
          />
          <Route path="memory" element={<Memory />} />
        </Routes>
      </InnerContainer>
    </Container>
  );
}

export default App;
