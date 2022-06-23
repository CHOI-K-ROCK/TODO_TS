/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AddNote from './AddNote';
import ListItem from './ListItem';
import Viewer from './Viewer';

const Container = styled.section`
  display: flex;

  width: 100%;

  .lists {
    width: 35%;
  }

  .contents {
    width: 75%;
    box-sizing: border-box;
    border: 1px solid;
  }
`;

interface INote {
  id: string;
  title: string;
  keywords?: string[];
  content: string;
}

function Memory(): JSX.Element {
  const notesSlice = useSelector(
    (state: { notesSlice: { notes: INote[] } }) => state.notesSlice.notes
  );
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [currentNote, setCurrentNote] = useState<INote>({
    id: '',
    title: '',
    keywords: [],
    content: '',
  });

  const toggleAdd = () => {
    setOpenAdd(!openAdd);
  };

  return (
    <Container>
      <ul className="lists">
        {notesSlice.map((note, idx) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <ListItem key={idx} note={note} setCurrentNote={setCurrentNote} />
          );
        })}
      </ul>
      <div className="contents">
        <button type="button" onClick={toggleAdd}>
          addNote
        </button>
        {openAdd ? <AddNote /> : <Viewer note={currentNote} />}
      </div>
    </Container>
  );
}

export default Memory;
