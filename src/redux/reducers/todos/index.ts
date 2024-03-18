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
  },
});

export const {createTodoItem, deleteTodoItem} = todosSlice.actions;

export default todosSlice.reducer;
