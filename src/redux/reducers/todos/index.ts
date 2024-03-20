import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TodoItem, TodosObject} from '../../../types';

export interface TodosState {
  // Keeps track of when the last local update was performed.
  updated: string; // ISO string
  todos: TodoItem[];
}

const initialState: TodosState = {
  updated: '',
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    updateLastUpdated: (state, action: PayloadAction<string>) => {
      // Keeps track of when the last local update was performed.
      state.updated = action.payload;
    },
    addTodoItems: (state, action: PayloadAction<TodoItem[]>) => {
      // Add the new items to the end of the todos list
      state.todos = [...state.todos, ...action.payload];
    },
    replaceTodoItems: (state, action: PayloadAction<TodosObject>) => {
      // Replace the existing items with the new ones. Used for syncing with the backend.
      state = action.payload;
    },
    saveChangesToTodoItem: (state, action: PayloadAction<TodoItem>) => {
      // Update an existing item in the list
      state.todos = state.todos.map(todo => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }
        return todo;
      });
    },
    createTodoItem: (state, action: PayloadAction<TodoItem>) => {
      // Create a new item in the list
      state.todos.push(action.payload);
    },
    deleteTodoItem: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(item => item.id !== action.payload);
    },
    clearAll: state => {
      state.todos = [];
    },
    setTodoCompletedState: (
      state,
      action: PayloadAction<{id: string; completed: boolean}>,
    ) => {
      state.todos = state.todos.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            completed: action.payload.completed,
          };
        }
        return item;
      });
    },
  },
});

export const {
  updateLastUpdated,
  createTodoItem,
  deleteTodoItem,
  saveChangesToTodoItem,
  setTodoCompletedState,
  replaceTodoItems,
  addTodoItems,
  clearAll,
} = todosSlice.actions;

export default todosSlice.reducer;
