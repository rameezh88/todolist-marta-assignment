import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TodoItem} from '../../../types';

export interface SavedState {
  todos: TodoItem[];
}

const initialState: SavedState = {
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    createTodoItem: (state, action: PayloadAction<TodoItem>) => {
      state.todos.push(action.payload);
    },
    deleteTodoItem: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(item => item.id !== action.payload);
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

export const {createTodoItem, deleteTodoItem, setTodoCompletedState} =
  todosSlice.actions;

export default todosSlice.reducer;
