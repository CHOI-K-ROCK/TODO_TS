import { notesActions } from 'modules/memory';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const Container = styled.section``;

function AddNote(): JSX.Element {
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>('');
  const [keywords, setKeywords] = useState<string | null>(null);
  // 키워드는 추가 할 수도, 안 할 수도 있음
  const [content, setContent] = useState<string>('');

  const addNote = () => {
    const keywordsArr = keywords?.split(',');
    // 옵셔널 체이닝으로 키워드가 있는 경우에만.
    dispatch(
      notesActions.addNote({
        id: uuidv4(),
        title,
        keywords: keywordsArr,
        content,
      })
    );
  };

  return (
    <Container>
      <h2>노트 추가하기</h2>
      <h3>제목</h3>
      <input
        type="text"
        className="title_input"
        onChange={(e) => setTitle(e.target.value)}
      />
      <h3>키워드 입력</h3>
      <input
        type="text"
        className="tag_input"
        onChange={(e) => setKeywords(e.target.value)}
      />
      <h3>본문</h3>
      <textarea
        className="content_input"
        onChange={(e) => setContent(e.target.value)}
      />

      <button type="button" onClick={addNote}>
        추가하기
      </button>
    </Container>
  );
}

export default AddNote;
