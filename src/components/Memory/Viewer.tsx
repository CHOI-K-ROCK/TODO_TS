import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsPen as EditIcon, BsTrash as DeleteIcon } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { notesActions } from 'modules/memory';
import { useNavigate } from 'react-router-dom';
import Modal from 'components/Modals/Modal';
import { modalActions } from 'modules/modal';

const Container = styled.section`
  width: 100%;

  position: relative;
  min-height: 680px;
  max-height: max-content;

  box-sizing: border-box;
  padding: 30px;

  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);

  border: 1px solid #eee;
  border-radius: 5px;

  .content {
    white-space: pre-wrap;
  }
`;

const TitleWrapper = styled.div`
  margin-bottom: 20px;

  .title {
    width: 85%;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;

    overflow: hidden;
    word-break: break-all;

    font-size: 1.3rem;
    font-weight: bold;
  }
`;

const BtnWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;

  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 5px;

  width: max-content;
  padding: 3px 0;

  .wrapper {
    display: flex;
    gap: 5px;
  }

  button {
    width: 2.5rem;
    height: 2.5rem;

    padding: 0;

    display: grid;
    place-items: center;

    background: none;
    border: none;
    border-radius: 10px;

    font-size: 1.5rem;

    cursor: pointer;

    transition: 0.1s;

    &:hover {
      background-color: #000;
      color: #fff;
      font-weight: bold;
    }
  }
`;

const KeywordsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 80%;

  min-height: 1.2rem;
  height: max-content;
  margin-bottom: 25px;

  .no_keyword {
    font-size: 0.9rem;
    padding: 5px 0;

    color: #777;
  }

  .keyword {
    font-size: 0.9rem;
    position: relative;
    min-width: 30px;
    width: max-content;
    padding: 5px 7px;

    text-align: center;
    background-color: #fff;
    border-radius: 100vmax;

    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);

    user-select: none;

    cursor: pointer;

    &:hover::after {
      content: '구글에서 해당 키워드를 검색합니다.';
      position: absolute;
      bottom: -30px;
      left: 0;
      display: block;

      width: max-content;
      padding: 5px;

      z-index: 1;

      font-size: 0.8rem;
      color: #fff;
      background-color: #000;

      animation: appear 0.2s linear;

      @keyframes appear {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    }
  }
`;

const ContentWrapper = styled.div`
  margin-bottom: 10px;

  .content {
    width: 100%;
    min-height: 500px;
    max-height: 600px;
    height: max-content;

    box-sizing: border-box;
    padding: 20px 10px;

    border: 2px solid #ddd;
    border-radius: 5px;

    font-size: 1rem;
    word-break: break-all;

    overflow: auto;
  }
`;

interface INote {
  id: string;
  title: string;
  keywords: string[];
  content: string;
}

function Viewer({ note }: { note: INote }): JSX.Element {
  const { id, title, keywords, content } = note;
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    if (!note.id) {
      nav('/memory');
    }
  });
  // 모달 전달 함수

  const openDeleteModal = () => {
    dispatch(
      modalActions.openModal({
        msg: '노트를 삭제하시겠습니까?',
        type: 'double',
        applyFn: () => {
          dispatch(notesActions.deleteNote({ id }));
          nav('/memory');
        },
      })
    );
  };

  // 컴포넌트 사용 함수

  const searchOnGoogle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    window.open(
      `https://www.google.com/search?q=${target.innerText}`,
      '_blank'
    );
  };

  return (
    <Container>
      {/* 제목 */}
      <TitleWrapper>
        <h2 className="title">{title}</h2>
      </TitleWrapper>

      <BtnWrapper>
        <button type="button" className="edit" onClick={() => nav('/memory')}>
          ✕
        </button>
        <div className="wrapper">
          <button
            type="button"
            className="edit"
            onClick={() => nav('/memory/edit')}
          >
            <EditIcon />
          </button>
          <button type="button" className="delete" onClick={openDeleteModal}>
            <DeleteIcon />
          </button>
        </div>
      </BtnWrapper>

      {/* 키워드 */}
      <KeywordsWrapper>
        {keywords.length ? (
          keywords.map((keyword) => {
            return (
              // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
              <div
                className="keyword"
                key={keyword}
                onClick={(e) => searchOnGoogle(e)}
              >
                {keyword}
              </div>
            );
          })
        ) : (
          <div className="no_keyword">작성된 키워드가 없습니다.</div>
        )}
      </KeywordsWrapper>

      {/* 본문 */}
      <ContentWrapper>
        <pre className="content">{content}</pre>
      </ContentWrapper>
    </Container>
  );
}

export default Viewer;
