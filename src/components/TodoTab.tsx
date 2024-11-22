/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { ITodo } from 'types';

import { todosActions } from 'modules/todos';

import { TodoHelmet } from 'metadatas/Helmets';
import Input from './todo/Input';
import TodoList from './todo/TodoList';
import DoneList from './todo/DoneList';

const Container = styled.section`
  width: 100%;
  min-height: 680px;
  max-height: max-content;

  .list_wrapper {
    position: relative;
    width: 100%;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }

  @media screen and (max-width: 1100px) {
    .list_wrapper {
      display: flex;
      flex-direction: column;
    }
  }
`;

interface IProps {
  todoList: ITodo[];
  setTodoList: Dispatch<SetStateAction<ITodo[]>>;
}

function TodoTab({ todoList, setTodoList }: IProps): JSX.Element {
  const dispatch = useDispatch();
  const todoSlice = useSelector(
    (state: { todosSlice: { todos: ITodo[] } }) => state.todosSlice.todos
  );

  const onDeleteAll = () => {
    dispatch(todosActions.clearDoneList());
  };

  const todos: ITodo[] = todoSlice.filter((todo) => !todo.done);
  const dones: ITodo[] = todoSlice.filter((todo) => todo.done);

  return (
    <>
      <TodoHelmet />
      <Container>
        <Input todoList={todoList} setTodoList={setTodoList} />
        <div className="list_wrapper">
          <TodoList todos={todos} />
          <DoneList dones={dones} onDeleteAll={onDeleteAll} />
        </div>
      </Container>
    </>
  );
}

export default TodoTab;
