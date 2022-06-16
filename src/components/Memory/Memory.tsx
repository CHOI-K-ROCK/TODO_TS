/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AddNote from './AddNote';
import ListItem from './ListItem';
import Viewer from './Viewer';

const Container = styled.section`
  display: grid;
  grid-template-columns: 3.5fr 6.5fr;

  width: 100%;
  background-color: #ddd;

  .lists {
    border: 1px solid;
  }

  .contents {
    border: 1px solid;
  }
`;

interface INote {
  id: string;
  title: string;
  keywords: string[];
  content: string;
}

function Memory(): JSX.Element {
  const notesSlice = useSelector(
    (state: { notesSlice: { notes: INote[] } }) => state.notesSlice.notes
  );

  const [currentNote, setCurrentNote] = useState<INote>({
    id: '',
    title: '',
    keywords: [],
    content: '',
  });

  return (
    <Container>
      <ul className="lists">
        {notesSlice.map((note, idx) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <ListItem key={idx} note={note} />
          );
        })}
      </ul>
      <div className="contents">
        <Viewer note={currentNote} setCurrentNote={setCurrentNote} />
      </div>
      <AddNote />
    </Container>
  );
}

export default Memory;
