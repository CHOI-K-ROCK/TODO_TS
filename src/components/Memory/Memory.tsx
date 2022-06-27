/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AddNote from './AddNote';
import ListItem from './ListItem';
import Viewer from './Viewer';

const Container = styled.section`
  width: 100%;
`;

const FunctionBar = styled.div`
  background-color: #eee;
  height: 40px;

  margin-bottom: 30px;
`;

const ContentsWrapper = styled.div`
  display: flex;

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
  keywords: string[] | null;
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
      <FunctionBar>
        <button type="button" onClick={toggleAdd}>
          addNote
        </button>
      </FunctionBar>
      <ContentsWrapper>
        <ul className="lists">
          {notesSlice.map((note, idx) => {
            return (
              <ListItem
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                note={note}
                setCurrentNote={setCurrentNote}
                setOpenAdd={setOpenAdd}
              />
            );
          })}
        </ul>
        <div className="contents">
          {openAdd ? <AddNote /> : <Viewer note={currentNote} />}
        </div>
      </ContentsWrapper>
    </Container>
  );
}

export default Memory;
