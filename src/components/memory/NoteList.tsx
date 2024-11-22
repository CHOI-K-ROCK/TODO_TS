import React from 'react';

import { INote } from 'types';
import styled from 'styled-components';
import ListEmptyMessage from './ListEmptyMessage';
import NoteListItem from './NoteListItem';

function NoteList({
  notes,
  onClickListItem,
  onClickAdd,
  isEmpty,
}: {
  notes: INote[];
  onClickListItem: React.Dispatch<React.SetStateAction<INote>>;
  onClickAdd: () => void;
  isEmpty: boolean;
}): JSX.Element {
  return (
    <div>
      {notes.length > 0 && (
        <ul className="lists">
          {notes.map((note) => {
            return (
              <NoteListItem
                key={note.id}
                note={note}
                onClick={onClickListItem}
              />
            );
          })}
        </ul>
      )}
      {isEmpty && <ListEmptyMessage onClickAdd={onClickAdd} />}
    </div>
  );
}

export default NoteList;
