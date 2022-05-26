import React from 'react';
import styled from 'styled-components';
import Todo from './Todo';

const Container = styled.section``;

interface IProps {
  todoList: string[];
}

function TodoList({ todoList }: IProps): JSX.Element {
  return (
    <Container>
      {todoList.map((content, idx) => {
        // eslint-disable-next-line react/no-array-index-key
        return <Todo key={idx} content={content} />;
      })}
    </Container>
  );
}

export default TodoList;
