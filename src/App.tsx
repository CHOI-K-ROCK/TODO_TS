import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { todosActions } from 'modules/todos';
import { notesActions } from 'modules/memory';

import MainPage from 'pages/MainPage';

function App(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    // 초기 데이터 로딩
    const todosData: string | null = window.localStorage.getItem('todosData');
    const notesData: string | null = window.localStorage.getItem('notesData');

    if (todosData) dispatch(todosActions.getLocalStorage());
    if (notesData) dispatch(notesActions.getLocalStorage());
  }, [dispatch]);
  // 페이지를 불러 올 때 데이터가 있는 경우 todoList 의 값을 해당 JSON 을 객체로 파싱한 값으로 갱신한다.

  return (
    <HelmetProvider>
      <Router basename="/memory_todo">
        <MainPage />
      </Router>
    </HelmetProvider>
  );
}

export default App;
