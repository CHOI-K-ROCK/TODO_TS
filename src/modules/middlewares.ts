/* eslint-disable import/prefer-default-export */
export const syncWithLocalStorage =
  (store: any) => (next: any) => (action: any) => {
    const result = next(action);

    const { type } = action;

    if (type.startsWith('todos/')) {
      const { todos } = store.getState().todosSlice;
      window.localStorage.setItem('todosData', JSON.stringify(todos));
    }

    if (type.startsWith('notes/')) {
      const { notes } = store.getState().notesSlice;
      window.localStorage.setItem('notesData', JSON.stringify(notes));
    }

    return result;
  };
