import React from 'react';
import styled from 'styled-components';

import { ITodo } from 'types';

import Todo from './TodoListItem';
import TodoEmptyMessage from './TodoEmptyMessage';

const ListContainer = styled.div`
  .title {
    display: flex;
    justify-content: center;

    margin-bottom: 20px;
    box-sizing: border-box;
    padding: 7px 0 5px;

    background-color: #d8d8d8;

    font-size: 1.2rem;
    text-align: center;

    user-select: none;
  }
  .list_wrapper {
    min-height: 200px;
    max-height: max-content;
  }
`;

function TodoList({ todos }: { todos: ITodo[] }): JSX.Element {
  return (
    <ListContainer>
      <div className="title">Todo</div>
      <div>
        {todos.length !== 0 ? (
          <ul>
            {todos.map((todo) => {
              return <Todo key={todo.id} id={todo.id} content={todo} />;
            })}
          </ul>
        ) : (
          <TodoEmptyMessage content="할 일이 없습니다." />
        )}
      </div>
    </ListContainer>
  );
}

export default TodoList;
