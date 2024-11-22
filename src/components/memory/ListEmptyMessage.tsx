import React from 'react';
import styled from 'styled-components';

const EmptyList = styled.div`
  height: 680px;
  display: grid;
  place-items: center;

  user-select: none;

  .note_not_found {
    display: flex;
    flex-direction: column;
    align-items: center;

    color: #777;
    p {
      margin-bottom: 20px;

      &:nth-child(2) {
        font-size: 1rem;
        margin-bottom: 30px;
      }
    }
  }

  button {
    position: relative;
    display: block;

    width: 30px;
    height: 30px;

    background-color: #ddd;

    border: none;
    border-radius: 10px;

    cursor: pointer;

    transition: 0.2s;

    span {
      position: absolute;
      top: calc(50% + 2px);
      left: 50%;
      transform: translate(-50%, -50%);

      font-size: 2rem;
      color: #fff;
    }

    &:hover {
      background-color: #000;
    }
  }
`;

function ListEmptyMessage({
  onClickAdd,
}: {
  onClickAdd: () => void;
}): JSX.Element {
  return (
    <EmptyList>
      <div className="note_not_found">
        <p>작성된 노트가 없습니다.</p>
        <p>아래 버튼을 눌러 노트를 추가하세요.</p>
        <button type="button" onClick={onClickAdd}>
          <span>+</span>
        </button>
      </div>
    </EmptyList>
  );
}

export default ListEmptyMessage;
