import React from 'react';
import styled from 'styled-components';

import { BsSearch as SearchIcon, BsPlus as PlusIcon } from 'react-icons/bs';

const BarWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  gap: 10px;

  height: max-content;
  min-height: 40px;

  margin-bottom: 30px;

  /* 좌측 검색창 박스 */
  .search_wrapper {
    flex: 1 0;
    position: relative;
    display: flex;

    /* 인풋 */
    .search_bar {
      width: 100%;
      min-width: 300px;
      height: 40px;

      padding-left: 10px;
      padding-right: 40px;
      box-sizing: border-box;

      border: 2px solid #ddd;
      border-radius: 5px;

      outline: none;
      font-size: 1.1rem;

      &:focus {
        border: 2px solid #000;
      }
    }

    /* 검색 아이콘 */
    .icon {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);

      color: #777;
    }
  }

  /* 우측 버튼 박스 */
  .btn_wrapper {
    flex: 2 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;

    button {
      display: flex;
      align-items: center;

      border: #ddd 2px solid;
      background-color: #fff;
      padding: 0 10px;

      width: max-content;
      height: 2.5rem;

      font-size: 1.1rem;

      border-radius: 10px;

      cursor: pointer;

      svg {
        font-size: 1.8rem;
      }

      transition: 0.1s;

      &:hover {
        background-color: #000;
        border: #000 2px solid;
        color: #fff;
      }
    }
  }

  @media (max-width: 1200px) {
    flex-direction: column;
    margin-bottom: 10px;
  }
`;

function FunctionBar({
  onChangeSearchValue,
  onClickRandom,
  onClickAdd,
}: {
  onChangeSearchValue: (value: string) => void;
  onClickRandom: () => void;
  onClickAdd: () => void;
}): JSX.Element {
  return (
    <BarWrapper>
      <div className="search_wrapper">
        <input
          type="text"
          className="search_bar"
          placeholder="검색하기"
          spellCheck={false}
          onChange={(e) => onChangeSearchValue(e.target.value)}
        />
        <div className="icon">
          <SearchIcon size="1.4rem" />
        </div>
      </div>
      <div className="btn_wrapper">
        <button type="button" onClick={onClickRandom}>
          <span>Random</span>
        </button>
        <button type="button" onClick={onClickAdd}>
          <span>노트추가</span>
          <PlusIcon />
        </button>
      </div>
    </BarWrapper>
  );
}

export default FunctionBar;
