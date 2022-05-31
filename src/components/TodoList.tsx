/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { BsFillTrashFill } from 'react-icons/bs';
import Done from './Done';
import Todo from './Todo';

const Container = styled.section`
  position: relative;
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  ul .title {
    display: flex;
    justify-content: center;

    margin-bottom: 20px;
    box-sizing: border-box;
    padding: 7px 0 5px;

    background-color: #d8d8d8;

    font-size: 1.2rem;
    text-align: center;

    & li {
      width: 100%;
    }
  }

  .deleteAll {
    position: absolute;
    top: 8px;
    right: 8px;

    font-size: 0.9rem;
    color: #444;
    cursor: pointer;
  }

  .empty {
    width: 100%;
    margin-top: 40px;
    text-align: center;
    color: #555;
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
  const todos: ITodo[] = todoList.filter((todo) => !todo.done);
  const dones: ITodo[] = todoList.filter((todo) => todo.done);

  const clearDoneList = () => {
    setTodoList(
      todoList.filter((todo) => {
        return todo.done === false;
      })
    );
  };

  return (
    <Container>
      <div className="todo">
        <ul>
          <div className="title">Todo</div>
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
        {todos.length === 0 && <div className="empty">비어 있습니다.</div>}
      </div>
      <div className="done">
        <ul>
          <div className="title">
            <span>Done</span>
            <div
              title="전체 내역을 삭제합니다."
              className="deleteAll"
              role="button"
              tabIndex={0}
              onClick={() => clearDoneList()}
            >
              <BsFillTrashFill />
            </div>
          </div>
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
        {dones.length === 0 && <div className="empty">비어 있습니다.</div>}
      </div>
    </Container>
  );
}

export default TodoList;
