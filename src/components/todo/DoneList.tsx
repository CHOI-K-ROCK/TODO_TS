import React from 'react';
import styled from 'styled-components';

import { ITodo } from 'types';

import { BsFillTrashFill } from 'react-icons/bs';

import Done from './DoneListItem';
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
    .deleteAll {
      top: auto;
    }
  }
`;

function DoneList({
  dones,
  onDeleteAll,
}: {
  dones: ITodo[];
  onDeleteAll: () => void;
}): JSX.Element {
  return (
    <ListContainer>
      <div className="title">
        <span>Done</span>
        <div
          className="deleteAll"
          role="button"
          tabIndex={0}
          onClick={onDeleteAll}
        >
          <BsFillTrashFill />
        </div>
      </div>
      <div>
        {dones.length !== 0 ? (
          <ul>
            {dones.map((done) => {
              return <Done key={done.id} id={done.id} content={done} />;
            })}
          </ul>
        ) : (
          <TodoEmptyMessage content="완료한 항목이 없습니다." />
        )}
      </div>
    </ListContainer>
  );
}

export default DoneList;
