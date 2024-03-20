import {createListenerMiddleware, isAnyOf} from '@reduxjs/toolkit';
import {
  createTodoItem,
  deleteTodoItem,
  replaceTodoItems,
  saveChangesToTodoItem,
  setTodoCompletedState,
  updateLastUpdated,
} from '.';

const todosListenerMiddleware = createListenerMiddleware();

const handleTodoDataUpdated = async (action: any, listenersApi: any) => {
  listenersApi.cancelActiveListeners();
  //   console.log('Intercepting todo data update...');
  listenersApi.dispatch(updateLastUpdated(new Date().toISOString()));

  // Sync with the backend
  //   console.log('Should sync with the backend...');
};

todosListenerMiddleware.startListening({
  matcher: isAnyOf(
    createTodoItem,
    deleteTodoItem,
    saveChangesToTodoItem,
    setTodoCompletedState,
    replaceTodoItems,
  ),
  effect: handleTodoDataUpdated,
});

export default todosListenerMiddleware;
