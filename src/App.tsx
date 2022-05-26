import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import TodoList from 'components/TodoList';
import Input from './components/Input';

const GlobalStyles = createGlobalStyle`
    ${reset}
  `;

const Container = styled.section`
  background-color: #888;
`;

function App(): JSX.Element {
  const [todoList, setTodoList] = useState<string[]>([]);

  return (
    <Container>
      <GlobalStyles />
      <Input todoList={todoList} setTodoList={setTodoList} />
      <TodoList todoList={todoList} />
    </Container>
  );
}

export default App;
