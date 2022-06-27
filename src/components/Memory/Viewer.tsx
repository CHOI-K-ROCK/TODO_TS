import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  height: 100%;

  .content {
    white-space: pre-wrap;
  }
`;

interface INote {
  id: string;
  title: string;
  keywords: string[] | null;
  content: string;
}

function Viewer({ note }: { note: INote }): JSX.Element {
  const { id, title, keywords, content } = note;
  return (
    <Container>
      <div className="title">{title}</div>
      <div className="keywords">{keywords}</div>
      <pre className="content">{content}</pre>
    </Container>
  );
}

export default Viewer;
