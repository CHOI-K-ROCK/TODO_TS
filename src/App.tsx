import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import TodoList from 'components/TodoList';
import Input from './components/Input';

const GlobalStyles = createGlobalStyle`
    ${reset}
  `;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
`;

const InnerContainer = styled.section`
  width: 50%;

  display: flex;
  align-items: center;
  flex-direction: column;

  position: relative;
  top: 20%;

  input {
    margin-bottom: 30px;
  }
`;

const Title = styled.section`
  width: 100%;
  margin-bottom: 40px;
  font-size: 3rem;
  text-align: center;
`;

interface ITodo {
  id: string;
  done: boolean;
  content: string;
}

function App(): JSX.Element {
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  // const [todoList, setTodoList] = useState<
  //   { id: string; done: boolean; content: string }[]
  // >([]);

  // Redux 적용 예정이지만 일단 기본적인 내용은 전부 완성 뒤에 적용시키기!

  return (
    <Container>
      <GlobalStyles />
      <InnerContainer>
        <Title>Todo-List</Title>
        <Input todoList={todoList} setTodoList={setTodoList} />
        <TodoList todoList={todoList} setTodoList={setTodoList} />
      </InnerContainer>
    </Container>
  );
}

export default App;
