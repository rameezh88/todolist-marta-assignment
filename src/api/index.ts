import {isAfter} from 'date-fns';
import {Platform} from 'react-native';
import {replaceTodoItems} from '../redux/reducers/todos';
import store from '../redux/store';
import {TodoItem, TodosObject} from '../types';
import {isEmpty} from 'lodash';

const ENDPOINTS = {
  TODOS:
    Platform.OS === 'ios'
      ? 'http://localhost:8000/todos'
      : 'http://10.0.2.2:8000/todos',
};

export async function syncTodosToBackend(localTodoState: TodosObject) {
  // 1. Fetch todos data from the backend.
  const response = await fetch(ENDPOINTS.TODOS);
  const todosObjectFromBackend: TodosObject = await response.json();

  const getBackendStateIsNewer = () => {
    if (!localTodoState.updated || isEmpty(localTodoState.updated)) {
      return true;
    } else if (
      !todosObjectFromBackend.updated ||
      isEmpty(todosObjectFromBackend.updated)
    ) {
      return false;
    }

    return isAfter(
      new Date(localTodoState.updated),
      new Date(todosObjectFromBackend.updated),
    );
  };

  // 2. The newer state replaces the older one.
  const backendStateIsNewer = getBackendStateIsNewer();

  const todoItemsToSync: TodoItem[] = backendStateIsNewer
    ? todosObjectFromBackend.todos
    : localTodoState.todos;

  // 4. Update the list of todos in the backend
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

  if (backendStateIsNewer) {
    // 5. Update the list of todos in the Redux store only if the backend state is newer.
    store.dispatch(
      replaceTodoItems({
        updated: new Date().toISOString(),
        todos: todoItemsToSync,
      }),
    );
  }
}
