import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { AppHelmet } from 'metadatas/Helmets';
import { GlobalStyles } from 'constant/styles';
import DevInfo from 'components/DevInfo';
import Logo from 'components/Logo';
import MemoryTab from 'components/MemoryTab';
import MenuBar from 'components/MenuBar';
import TodoTab from 'components/TodoTab';
import Modal from 'components/modal/Modal';

import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ITodo, INote, IModal } from 'types';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100vw;
  height: max-content;

  margin: 200px 0;
`;

const InnerContainer = styled.section`
  width: min(60vw, 1000px);
  height: max-content;

  display: flex;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 750px) {
    width: 80vw;
  }
`;
function MainPage(): JSX.Element {
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  const todoSlice = useSelector(
    (state: { todosSlice: { todos: ITodo[] } }) => state.todosSlice.todos
  );
  const notesSlice = useSelector(
    (state: { notesSlice: { notes: INote[] } }) => state.notesSlice.notes
  );
  const modalSlice = useSelector(
    (state: { modalSlice: IModal }) => state.modalSlice
  );

  useEffect(() => {
    window.localStorage.setItem('todosData', JSON.stringify(todoSlice));
  }, [todoSlice]);

  useEffect(() => {
    window.localStorage.setItem('notesData', JSON.stringify(notesSlice));
  }, [notesSlice]);
  // 상태가 변경될 때 해당 내용을 로컬 스토리지에 저장한다.
  // 위 두 Effect Hook 으로 인해 서버없이도 브라우저에 저장된다.

  return (
    <>
      <AppHelmet />
      <Container>
        <GlobalStyles />
        <Logo />
        <InnerContainer>
          <MenuBar />
          <Routes>
            <Route
              path="/"
              element={
                <TodoTab todoList={todoList} setTodoList={setTodoList} />
              }
            />
            <Route path="memory/*" element={<MemoryTab />} />
          </Routes>
        </InnerContainer>
      </Container>
      <DevInfo />
      {modalSlice.isOpen && (
        <Modal
          msg={modalSlice.msg}
          type={modalSlice.type}
          applyFn={modalSlice.applyFn}
        />
      )}
    </>
  );
}

export default MainPage;
