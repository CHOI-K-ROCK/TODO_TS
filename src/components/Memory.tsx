/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BsSearch as SearchIcon, BsPlus as PlusIcon } from 'react-icons/bs';
import { NotesMeta } from 'metadatas/metadatas';

import AddNote from './Memory/AddNote';
import DefaultPage from './Memory/DefaultPage';
import EditNote from './Memory/EditNote';
import ListItem from './Memory/ListItem';
import Viewer from './Memory/Viewer';
import Modal from './Modals/Modal';
import RandomNote from './Modals/RandomNote';

const Container = styled.section`
  width: 100%;
  min-height: 680px;
`;

const FunctionBar = styled.div`
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

const ContentsWrapper = styled.div`
  width: 100%;

  display: flex;
  gap: 10px;
  min-height: 680px;

  /* 노트 리스트 박스 */
  .list_wrapper {
    position: relative;
    flex: 1 0;

    min-width: 300px;
    height: 680px;
    overflow-y: auto;

    /* 아무것도 없는 경우 */
    .empty_list {
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
    }
  }
  /* 뷰어 및 에디터 박스 */
  .contents_wrapper {
    flex: 2 0;
    min-height: 100%;
    height: max-content;

    box-sizing: border-box;

    animation: rise 0.3s;

    @keyframes rise {
      0% {
        opacity: 0;
        transform: translateY(5px);
      }

      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  @media (max-width: 1200px) {
    .contents_wrapper {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      width: min(500px, 90vw);
      min-height: auto;
      z-index: 1;
      background-color: #fff;
    }
  }
`;

interface INote {
  id: string;
  title: string;
  keywords: string[];
  content: string;
}

function Memory(): JSX.Element {
  const nav = useNavigate();
  const notesSlice = useSelector(
    (state: { notesSlice: { notes: INote[] } }) => state.notesSlice.notes
  );

  const [currentNote, setCurrentNote] = useState<INote>({
    id: '',
    title: '',
    keywords: [],
    content: '',
  });
  const [searchValue, setSearchValue] = useState<string>('');
  const [randomNoteOpen, setRandomNoteOpen] = useState<boolean>(false);
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);

  const getRandomIdxArr = (num: number) => {
    const idxArr = Array(num)
      .fill(null)
      .map((el, idx) => idx);

    return idxArr.sort(() => Math.random() - 0.5);
  };

  const randomNoteBtnHandler = () => {
    if (notesSlice.length) {
      setRandomNoteOpen(true);
    } else {
      setAlertModalOpen(true);
    }
  };

  return (
    <>
      <NotesMeta />
      {/* 랜덤 노트 표시 */}
      {randomNoteOpen && (
        <RandomNote
          setRandomNoteOpen={setRandomNoteOpen}
          idxArr={getRandomIdxArr(notesSlice.length)}
        />
      )}
      {alertModalOpen && (
        <Modal
          msg="작성된 노트가 없습니다."
          type="single"
          applyFn={() => setAlertModalOpen(false)}
        />
      )}
      <Container>
        {/* 검색 및 기능 바 */}
        <FunctionBar>
          <div className="search_wrapper">
            <input
              type="text"
              className="search_bar"
              placeholder="검색하기"
              spellCheck={false}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className="icon">
              <SearchIcon size="1.4rem" />
            </div>
          </div>
          <div className="btn_wrapper">
            <button type="button" onClick={randomNoteBtnHandler}>
              <span>Random</span>
            </button>
            <button type="button" onClick={() => nav('/memory/add')}>
              <span>노트추가</span>
              <PlusIcon />
            </button>
          </div>
        </FunctionBar>
        <ContentsWrapper>
          {/* 노트 리스트 표시 */}
          <div className="list_wrapper">
            {notesSlice.length ? (
              <ul className="lists">
                {notesSlice
                  .filter((note) => {
                    if (searchValue) {
                      return note.title.match(searchValue);
                    }
                    return true;
                  })
                  .map((note, idx) => {
                    return (
                      <ListItem
                        // eslint-disable-next-line react/no-array-index-key
                        key={idx}
                        note={note}
                        setCurrentNote={setCurrentNote}
                      />
                    );
                  })}
              </ul>
            ) : (
              // 리스트의 길이가 0인 경우 메시지 표시
              <div className="empty_list">
                <div className="note_not_found">
                  <p>작성된 노트가 없습니다.</p>
                  <p>아래 버튼을 눌러 노트를 추가하세요.</p>
                  <button
                    type="button"
                    onClick={() => {
                      nav('/memory/add');
                    }}
                  >
                    <span>+</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 중첩 라우팅을 이용하여 뷰어 및 에디터 표시 */}
          <div className="contents_wrapper">
            <Routes>
              <Route path="/" element={<DefaultPage />} />
              <Route path="view" element={<Viewer note={currentNote} />} />
              <Route path="add" element={<AddNote />} />
              <Route
                path="edit"
                element={
                  <EditNote
                    currentNote={currentNote}
                    setCurrentNote={setCurrentNote}
                  />
                }
              />
            </Routes>
          </div>
        </ContentsWrapper>
      </Container>
    </>
  );
}

export default Memory;
