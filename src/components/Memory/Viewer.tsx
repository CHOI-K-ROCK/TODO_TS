import React, { useState } from 'react';
import styled from 'styled-components';
import { BsPen as EditIcon, BsTrash as DeleteIcon } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { notesActions } from 'modules/memory';

const Container = styled.section`
  position: relative;
  height: 100%;
  padding: 30px;

  .content {
    white-space: pre-wrap;
  }
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const BtnWrapper = styled.div`
  position: absolute;
  top: 25px;
  right: 30px;

  display: flex;
  gap: 5px;

  width: max-content;
  padding: 3px 0;

  button {
    display: block;
    padding-top: 6px;

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

  height: 1.2rem;
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
    min-height: 450px;
    max-height: 600px;
    height: max-content;

    box-sizing: border-box;
    padding: 20px 10px;

    border: 2px solid #ddd;
    border-radius: 5px;

    font-size: 1rem;

    overflow: auto;
  }
`;

interface INote {
  id: string;
  title: string;
  keywords: string[];
  content: string;
}

function Viewer({
  note,
  toggleEdit,
}: {
  note: INote;
  toggleEdit: () => void;
}): JSX.Element {
  const { id, title, keywords, content } = note;
  const dispatch = useDispatch();

  const searchOnGoogle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.dir(e);
    const target = e.target as HTMLDivElement;
    window.open(
      `https://www.google.com/search?q=${target.innerText}`,
      '_blank'
    );
  };

  return (
    <Container>
      {/* 제목 */}
      <Title>{title}</Title>

      <BtnWrapper>
        <button type="button" className="edit" onClick={toggleEdit}>
          <EditIcon />
        </button>
        <button
          type="button"
          className="delete"
          onClick={() => dispatch(notesActions.deleteNote({ id }))}
        >
          <DeleteIcon />
        </button>
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
