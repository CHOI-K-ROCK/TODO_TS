/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { BsFillTrashFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { todosActions } from 'modules/todos';

import Done from './Todo/Done';
import Todo from './Todo/Todo';
import Input from './Todo/Input';

const Container = styled.section`
  width: 100%;
  min-height: 680px;
  max-height: max-content;

  .todo_wrapper {
    position: relative;
    width: 100%;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }

  .title {
    display: flex;
    justify-content: center;

    margin-bottom: 20px;
    box-sizing: border-box;
    padding: 7px 0 5px;

    background-color: #d8d8d8;

    font-size: 1.2rem;
    text-align: center;
  }

  .list_wrapper {
    min-height: 200px;
    max-height: max-content;

    .empty {
      display: grid;
      place-items: center;

      width: 100%;
      height: 200px;

      & span {
        color: #555;
      }
    }
  }

  .deleteAll {
    position: absolute;
    top: 8px;
    right: 8px;

    font-size: 0.9rem;
    color: #444;
    cursor: pointer;

    &::after {
      position: absolute;
      top: -150%;

      display: block;

      visibility: hidden;
      opacity: 0;

      content: '전체삭제';
      width: max-content;
      background-color: #fff;
      padding: 5px;
      border-radius: 5px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);

      transition: 0.2s 0.3s;
    }

    &:hover::after {
      visibility: visible;
      opacity: 1;
    }
  }

  @media screen and (max-width: 1100px) {
    .todo_wrapper {
      display: flex;
      flex-direction: column;
    }

    .deleteAll {
      top: auto;
    }
  }
`;

interface ITodo {
  id: string;
  done: boolean;
  content: string;
}

interface IProps {
  todoList: ITodo[];
  setTodoList: Dispatch<SetStateAction<ITodo[]>>;
}

function TodoList({ todoList, setTodoList }: IProps): JSX.Element {
  const dispatch = useDispatch();
  const todoSlice = useSelector(
    (state: { todosSlice: { todos: ITodo[] } }) => state.todosSlice.todos
  );

  const todos: ITodo[] = todoSlice.filter((todo) => !todo.done);
  const dones: ITodo[] = todoSlice.filter((todo) => todo.done);

  return (
    <Container>
      <Input todoList={todoList} setTodoList={setTodoList} />
      <div className="todo_wrapper">
        <div className="todo">
          <div className="title">Todo</div>
          <div className="list_wrapper">
            {todos.length !== 0 ? (
              <ul>
                {todos.map((todo, idx) => {
                  return (
                    <Todo
                      // eslint-disable-next-line react/no-array-index-key
                      key={idx}
                      id={todo.id}
                      content={todo}
                      todoList={todoList}
                      setTodoList={setTodoList}
                    />
                  );
                })}
              </ul>
            ) : (
              <div className="empty">
                <span>할 일이 없습니다.</span>
              </div>
            )}
          </div>
        </div>
        <div className="done">
          <div className="title">
            <span>Done</span>
            <div
              className="deleteAll"
              role="button"
              tabIndex={0}
              onClick={() => dispatch(todosActions.clearDoneList())}
            >
              <BsFillTrashFill />
            </div>
          </div>
          <div className="list_wrapper">
            {dones.length !== 0 ? (
              <ul>
                {dones.map((todo, idx) => {
                  return (
                    <Done
                      // eslint-disable-next-line react/no-array-index-key
                      key={idx}
                      id={todo.id}
                      content={todo}
                      todoList={todoList}
                      setTodoList={setTodoList}
                    />
                  );
                })}
              </ul>
            ) : (
              <div className="empty">
                <span>완료한 항목이 없습니다.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default TodoList;
