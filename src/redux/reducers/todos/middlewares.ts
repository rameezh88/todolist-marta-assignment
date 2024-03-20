import {createListenerMiddleware, isAnyOf} from '@reduxjs/toolkit';
import {
  createTodoItem,
  deleteTodoItem,
  saveChangesToTodoItem,
  setTodoCompletedState,
  updateLastUpdated,
} from '.';
import {RootState} from '../../store';
import {syncTodosToBackend} from '../../../api';

const todosListenerMiddleware = createListenerMiddleware();

const handleTodoDataUpdated = async (_: any, listenersApi: any) => {
  listenersApi.cancelActiveListeners();

  // Update last-updated timestamp in Redux store.
  const lastUpdated = new Date().toISOString();
  listenersApi.dispatch(updateLastUpdated(lastUpdated));

  const {todos}: RootState = listenersApi.getState();

  // Sync with the backend
  syncTodosToBackend(
    {
      updated: lastUpdated,
      todos: todos.todos,
    },
    listenersApi.dispatch,
  );
};

todosListenerMiddleware.startListening({
  matcher: isAnyOf(
    createTodoItem,
    deleteTodoItem,
    saveChangesToTodoItem,
    setTodoCompletedState,
  ),
  effect: handleTodoDataUpdated,
});

export default todosListenerMiddleware;
