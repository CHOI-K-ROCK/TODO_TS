import React from 'react';
import styled from 'styled-components';

const Container = styled.li`
  height: 100px;
`;

interface INote {
  id: string;
  title: string;
  keywords: string[];
  content: string;
}

function ListItem({ note }: { note: INote }): JSX.Element {
  const { id, title, content } = note;

  return (
    <Container>
      <div className="id">{id}</div>
      <div className="title">{title}</div>
      <div className="content">{content}</div>
    </Container>
  );
}

export default ListItem;
