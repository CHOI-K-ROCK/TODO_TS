/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AddNote from './AddNote';
import EditNote from './EditNote';
import ListItem from './ListItem';
import Viewer from './Viewer';

const Container = styled.section`
  width: 100%;
`;

const FunctionBar = styled.div`
  background-color: #eee;
  height: 40px;

  margin-bottom: 30px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  gap: 10px;

  .lists {
    flex: 1 0;

    min-width: 300px;
    min-height: 600px;
    height: max-content;
  }

  .contents {
    flex: 2 0;
    min-height: 600px;
    height: max-content;

    box-sizing: border-box;

    border: 1px solid #eee;

    border-radius: 5px;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);

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

    .default_page {
      display: grid;
      place-items: center;

      height: 600px;

      font-size: 1.2rem;
      color: #777;

      .note_not_found {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
          margin-bottom: 20px;

          &:nth-child(2) {
            font-size: 1rem;
            margin-bottom: 30px;
          }
        }
      }
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
  const notesSlice = useSelector(
    (state: { notesSlice: { notes: INote[] } }) => state.notesSlice.notes
  );
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openViewer, setOpenViewer] = useState<boolean>(false); // 뷰어 끄는 기능 만드는 거 고려하기.
  const [currentNote, setCurrentNote] = useState<INote>({
    id: '',
    title: '',
    keywords: [],
    content: '',
  });

  const toggleAdd = () => {
    setOpenAdd(!openAdd);
  };

  const toggleEdit = () => {
    setOpenEdit(!openEdit);
  };

  const closeEditor = () => {
    setOpenAdd(false);
    setOpenEdit(false);
  };

  return (
    <Container>
      <FunctionBar>
        <button type="button" onClick={toggleAdd}>
          addNote
        </button>
      </FunctionBar>
      <ContentsWrapper>
        <ul className="lists">
          {notesSlice.map((note, idx) => {
            return (
              <ListItem
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                note={note}
                setCurrentNote={setCurrentNote}
                setOpenViewer={setOpenViewer}
                closeEditor={closeEditor}
              />
            );
          })}
        </ul>
        <div className="contents">
          {/* 추가 페이지 */}
          {openAdd && <AddNote setOpenAdd={setOpenAdd} />}

          {/* 수정 페이지 */}
          {openEdit && (
            <EditNote setOpenEdit={setOpenEdit} currentNote={currentNote} />
          )}

          {/* 뷰어 표시 */}
          {currentNote.id && !openAdd && !openEdit ? (
            <Viewer note={currentNote} toggleEdit={toggleEdit} />
          ) : null}

          {/* 기본 페이지 렌더링 */}
          {!openViewer && !openAdd && !openEdit && (
            <div className="default_page">
              {/* 노트가 선택되지 않은 경우 */}
              {notesSlice.length && !openAdd && !openEdit ? (
                <p>선택된 노트가 없습니다.</p>
              ) : null}

              {/* 작성한 노트가 없는 경우 */}
              {!notesSlice.length && !openAdd && !openEdit ? (
                <div className="note_not_found">
                  <p>작성된 노트가 없습니다.</p>
                  <p>아래 버튼을 눌러 노트를 추가하세요.</p>
                  <button type="button" onClick={toggleAdd}>
                    addNote
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </ContentsWrapper>
    </Container>
  );
}

export default Memory;
