import { notesActions } from 'modules/memory';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const Container = styled.section``;

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

function AddNote(): JSX.Element {
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordValue, setKeywordValue] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const addKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      keywords &&
      !keywords.includes(keywordValue) &&
      e.key === 'Enter' &&
      e.nativeEvent.isComposing === false
    ) {
      setKeywords([...keywords, keywordValue]);
      setKeywordValue('');
    }
  };

  const deleteKeyword = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setKeywords(
      keywords.filter((keyword) => {
        return keyword !== e.currentTarget.innerText;
        // target 과 currentTarget 의 차이
        // tatget : 이벤트를 발생시킨 요소
        // currentTarget : 이벤트를 가지고 있는 요소
        // 미묘하지만 큰 차이임!
      })
    );
  };

  const addNote = () => {
    dispatch(
      notesActions.addNote({
        id: uuidv4(),
        title,
        keywords,
        content,
      })
    );
  };

  return (
    <Container>
      <h2>노트 추가하기</h2>

      {/* 제목 입력 */}
      <h3>제목</h3>
      <input
        type="text"
        className="title_input"
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* 키워드 */}
      <h3>키워드 입력</h3>
      <KeywordsWrapper>
        {/* 키워드 표시 */}
        {keywords?.map((keyword) => {
          return (
            <div
              className="keyword"
              role="button"
              key={uuidv4()}
              aria-hidden="true"
              onClick={(e) => deleteKeyword(e)}
            >
              {keyword}
            </div>
          );
        })}
        {/* 키워드 입력 */}
        <input
          type="text"
          className="tag_input"
          value={keywordValue}
          onChange={(e) => setKeywordValue(e.currentTarget.value)}
          onKeyDown={(e) => addKeyword(e)}
        />
      </KeywordsWrapper>

      {/* 본문 작성 */}
      <h3>본문</h3>
      <textarea
        className="content_input"
        onChange={(e) => setContent(e.target.value)}
      />

      {/* 노트 추가 버튼 */}
      <button type="button" onClick={addNote}>
        추가하기
      </button>
    </Container>
  );
}

export default AddNote;
