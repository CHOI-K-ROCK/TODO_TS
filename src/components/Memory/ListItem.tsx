import Modal from 'components/Modals/Modal';
import { notesActions } from 'modules/memory';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Item = styled.li`
  align-items: center;

  width: 100%;
  min-height: 70px;
  height: max-content;

  margin-bottom: 10px;
  padding: 20px;

  box-sizing: border-box;
  border: 1px solid #eee;

  border-radius: 5px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);

  word-break: break-all;

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

  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }
  .title_wrapper {
    position: relative;

    .title {
      width: 90%;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      font-size: 1.1rem;
      font-weight: bold;

      margin-bottom: 10px;
      height: 20px;
    }

    button {
      position: absolute;
      top: -2px;
      right: -5px;

      background: none;
      border: none;
      font-size: 1.2rem;

      cursor: pointer;

      transition: 0.1s;

      &:hover {
        color: #fb8888;
      }
    }
  }

  .content {
    width: 100%;

    font-size: 0.9rem;
    overflow: hidden;
    white-space: pre-wrap;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    // 두 줄 이상인 경우에 말줄임을 사용한다.
    // 위의 세 속성을 모두 사용해야함.
  }
`;

const KeywordsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  margin-bottom: 12px;

  .keyword {
    font-size: 0.8rem;

    min-width: 30px;
    width: max-content;
    padding: 5px 7px;

    text-align: center;
    background-color: #fff;
    border-radius: 100vmax;

    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);

    &.empty {
      padding: 5px 0;
      border: none;

      background-color: transparent;
      box-shadow: none;

      color: #777;
    }
  }
`;

interface INote {
  id: string;
  title: string;
  keywords: string[];
  content: string;
}

function ListItem({
  note,
  setCurrentNote,
}: {
  note: INote;
  setCurrentNote: React.Dispatch<React.SetStateAction<INote>>;
}): JSX.Element {
  const { id, title, keywords, content } = note;
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const applyFn = () => {
    dispatch(notesActions.deleteNote({ id }));
    nav('/memory');
  };

  const listClickHandler = () => {
    setCurrentNote(note);
    nav('/memory/view');
  };

  return (
    <>
      {isDeleteModalOpen && (
        <Modal
          msg="노트를 삭제하시겠습니까?"
          applyFn={() => applyFn()}
          dismissFn={() => setDeleteModalOpen(false)}
          type="double"
        />
      )}
      <Item onClick={listClickHandler}>
        <div className="title_wrapper">
          <div className="title">{title}</div>
          <button type="button" onClick={() => setDeleteModalOpen(true)}>
            ✕
          </button>
        </div>
        <KeywordsWrapper>
          {keywords.length ? (
            keywords?.map((el, idx) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div className="keyword" key={idx}>
                  {el}
                </div>
              );
            })
          ) : (
            <div className="keyword empty">키워드 없음</div>
          )}
        </KeywordsWrapper>
        <pre className="content">{content}</pre>
      </Item>
    </>
  );
}

export default ListItem;
