import React from 'react';
import styled from 'styled-components';

const Container = styled.section``;

interface INote {
  id: string;
  title: string;
  keywords: string[];
  content: string;
}

function Viewer({
  note,
}: {
  note: INote;
  // eslint-disable-next-line react/no-unused-prop-types
  setCurrentNote: React.Dispatch<React.SetStateAction<INote>>;
}): JSX.Element {
  const { id, title, keywords, content } = note;
  return <Container>{id}</Container>;
}

export default Viewer;
