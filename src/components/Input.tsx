import React, { Dispatch, SetStateAction, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import styled from 'styled-components';

const Container = styled.section`
  position: relative;
  width: 100%;
  height: 70px;

  input {
    width: 100%;
    height: 40px;

    padding: 0 20px;

    box-sizing: border-box;
    border: 1px solid #999;
    border-radius: 3px;

    font-size: 1.1rem;

    outline: none;

    &:focus {
      border: 2px solid #000;
    }
  }

  button {
    position: absolute;
    top: 4px;
    right: 4px;

    height: 2rem;
    width: 2rem;
    padding: 0;
    background-color: #eee;

    border: none;
    border-radius: 5px;

    font-size: 2rem;
    cursor: pointer;

    &:hover {
      background-color: #97d4fa;
    }
  }
`;

interface IProps {
  todoList: string[];
  // 문자열(string)을 가지는 배열([])을 의미한다.
  setTodoList: Dispatch<SetStateAction<string[]>>;
}

function Input({ todoList, setTodoList }: IProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');

  const addTodo = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!inputValue) return;
    setTodoList([...todoList, inputValue]);
    setInputValue('');
  };

  return (
    <Container>
      <form onSubmit={(e) => addTodo(e)}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" onClick={(e) => addTodo(e)}>
          <BsPlus />
        </button>
      </form>
    </Container>
  );
}

export default Input;
