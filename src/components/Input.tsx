import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

const Container = styled.section``;

interface IProps {
  todoList: string[];
  // 문자열(string)을 가지는 배열([])을 의미한다.

  setTodoList: Dispatch<SetStateAction<string[]>>;
}

function Input({ todoList, setTodoList }: IProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');

  const addTodo = () => {
    if (!inputValue) return;
    setTodoList([...todoList, inputValue]);
    setInputValue('');
  };
  return (
    <Container>
      <form>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="button" onClick={addTodo}>
          +
        </button>
      </form>
    </Container>
  );
}

export default Input;
