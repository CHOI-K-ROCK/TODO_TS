import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  height: 100%;
`;

interface INote {
  id: string;
  title: string;
  keywords?: string[];
  content: string;
}

function Viewer({ note }: { note: INote }): JSX.Element {
  const { id, title, keywords, content } = note;
  return (
    <Container>
      <div className="title">{title}</div>
      <div className="keywords">{keywords}</div>
      <div className="content">{content}</div>
    </Container>
  );
}

export default Viewer;
