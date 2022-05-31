import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { BsCheck, BsDash } from 'react-icons/bs';

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;
  width: 100%;
  min-height: 70px;

  box-sizing: border-box;
  padding: 20px;

  border: 1px solid #eee;

  border-radius: 5px;

  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);

  word-break: break-all;

  animation: rise 0.2s;

  @keyframes rise {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  button {
    position: relative;
    padding: 0;

    width: 1.2rem;
    height: 1.2rem;

    margin-left: 10px;

    font-size: 1.2rem;

    background-color: #eee;

    border: none;
    border-radius: 50%;

    cursor: pointer;

    transition: 0.1s;

    &:hover {
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);

      &.delete {
        background-color: #ffacac;
      }

      &.done {
        background-color: #97d4fa;
      }
    }
  }
`;

interface ITodo {
  id: string;
  done: boolean;
  content: string;
}

interface IProps {
  content: ITodo;
  id: string;
  todoList: ITodo[];
  setTodoList: Dispatch<SetStateAction<ITodo[]>>;
}
// 현재 todoList 를 저장하는 App.tsx로 부터 TodoList.tsx -> Todo.tsx 까지 PropsDrilling 이 심한편
// 리덕스를 적용시켜보는 것을 적극적으로 검토해보기.

// ReduxToolkit 보단 일반 Redux 먼저 사용해보기!

function Todo({ content, id, todoList, setTodoList }: IProps): JSX.Element {
  const deleteTodo = () => {
    setTodoList(
      todoList.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  const completeTodo = () => {
    // Object.assign(content, { done: true });
    const todo = content;
    todo.done = true;
    setTodoList([...todoList]);
  };

  return (
    <Container>
      <p>{content.content}</p>
      <div className="buttonWrap">
        <button
          type="button"
          className="delete"
          title="삭제"
          onClick={deleteTodo}
        >
          <BsDash />
        </button>
        <button
          type="button"
          className="done"
          title="완료로 표시"
          onClick={completeTodo}
        >
          <BsCheck />
        </button>
      </div>
    </Container>
  );
}

export default Todo;
