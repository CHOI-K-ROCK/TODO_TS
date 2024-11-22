import { configureStore } from '@reduxjs/toolkit';

import todosSlice from './todos';
import notesSlice from './memory';
import modalSlice from './modal';

const store = configureStore({
  reducer: {
    todosSlice,
    notesSlice,
    modalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  // 리덕스로의 함수전달시 직렬화 체크기능을 해제함.
  // 기본적으로, 리덕스의 상태는 직렬화 할 수 있는 값이여야하므로, 위의 내용을 사용하지 않는 것이 권장된다.
});

export default store;
