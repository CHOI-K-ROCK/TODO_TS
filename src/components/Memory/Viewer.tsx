import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
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

function Viewer({ note }: { note: INote }): JSX.Element {
  const { id, title, keywords, content } = note;
  return (
    <Container>
      {/* 제목 */}
      <Title>{title}</Title>

      {/* 키워드 */}
      <KeywordsWrapper>
        {keywords.length ? (
          keywords.map((keyword) => {
            return (
              <div className="keyword" key={keyword}>
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
