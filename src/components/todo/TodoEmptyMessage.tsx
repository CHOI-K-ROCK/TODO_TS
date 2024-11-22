import React from 'react';
import styled from 'styled-components';

const Empty = styled.div`
  display: grid;
  place-items: center;

  width: 100%;
  height: 200px;

  & span {
    color: #555;
  }
`;

function TodoEmptyMessage({ content }: { content: string }): JSX.Element {
  return (
    <Empty>
      <span>{content}</span>
    </Empty>
  );
}

export default TodoEmptyMessage;
