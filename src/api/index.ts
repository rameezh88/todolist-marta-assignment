import {Dispatch} from '@reduxjs/toolkit';
import {isAfter} from 'date-fns';
import {replaceTodoItems} from '../redux/reducers/todos';
import {TodoItem, TodosObject} from '../types';

const ENDPOINTS = {
  TODOS: 'http://localhost:8000/todos',
};

export async function syncTodosToBackend(
  localTodoState: TodosObject,
  dispatch: Dispatch,
) {
  // 1. Fetch todos data from the backend.
  const response = await fetch(ENDPOINTS.TODOS);
  const todosObjectFromBackend: TodosObject = await response.json();

  // 2. The newer state replaces the older one.
  const backendStateIsNewer = isAfter(
    todosObjectFromBackend.updated,
    localTodoState.updated,
  );

  const todoItemsToSync: TodoItem[] = backendStateIsNewer
    ? todosObjectFromBackend.todos
    : localTodoState.todos;

  if (backendStateIsNewer) {
    // 4. Update the list of todos in the Redux store only if the backend state is newer.
    dispatch(
      replaceTodoItems({
        updated: new Date().toISOString(),
        todos: todoItemsToSync,
      }),
    );
  }

  // 5. Update the list of todos in the backend
  const requestBody = JSON.stringify({
    updated: new Date().toISOString(),
    todos: todoItemsToSync,
  });
  await fetch(ENDPOINTS.TODOS, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: requestBody,
  });
}
