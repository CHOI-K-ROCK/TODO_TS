/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useMemo, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import { INote } from 'types';
import { MemoryHelmet } from 'metadatas/Helmets';

import { getRandomIdxArr } from 'utils';
import AddNote from './memory/AddNote';
import DefaultPage from './memory/DefaultPage';
import Viewer from './memory/Viewer';
import Modal from './modal/Modal';
import RandomNote from './modal/RandomNote';
import FunctionBar from './memory/FunctionBar';
import NoteEditor from './memory/NoteEditor';
import NoteList from './memory/NoteList';

const Container = styled.section`
  width: 100%;
  min-height: 680px;
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

function MemoryTab(): JSX.Element {
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

  const randomNoteBtnHandler = () => {
    if (notesSlice.length) {
      setRandomNoteOpen(true);
    } else {
      setAlertModalOpen(true);
    }
  };

  const filteredNotes = useMemo(() => {
    return notesSlice.filter((note) => note.title.match(searchValue));
  }, [searchValue, notesSlice]);

  return (
    <>
      <MemoryHelmet />
      <Container>
        {/* 검색 및 기능 바 */}
        <FunctionBar
          onChangeSearchValue={setSearchValue}
          onClickRandom={randomNoteBtnHandler}
          onClickAdd={() => nav('/memory/add')}
        />
        <ContentsWrapper>
          {/* 노트 리스트 표시 */}
          <div className="list_wrapper">
            <NoteList
              notes={filteredNotes}
              onClickListItem={setCurrentNote}
              onClickAdd={() => nav('/memory/add')}
              isEmpty={notesSlice.length === 0}
            />
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
                  <NoteEditor note={currentNote} onEdit={setCurrentNote} />
                }
              />
            </Routes>
          </div>
        </ContentsWrapper>
      </Container>

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
    </>
  );
}

export default MemoryTab;
