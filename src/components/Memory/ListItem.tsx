import React from 'react';
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

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-size: 1.1rem;
    font-weight: bold;

    margin-bottom: 10px;
    height: 20px;
  }

  .content {
    overflow: hidden;
    text-overflow: ellipsis;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

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
  }
`;

interface INote {
  id: string;
  title: string;
  keywords?: string[];
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

  return (
    <Item
      onClick={() =>
        setCurrentNote({
          id,
          title,
          keywords,
          content,
        })
      }
    >
      <div className="title">{title}</div>
      <KeywordsWrapper>
        {keywords?.map((el, idx) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div className="keyword" key={idx}>
              {el}
            </div>
          );
        })}
      </KeywordsWrapper>
      <div className="content">{content}</div>
    </Item>
  );
}

export default ListItem;
