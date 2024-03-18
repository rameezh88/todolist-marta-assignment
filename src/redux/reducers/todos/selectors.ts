import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../store';

export const selectTodosData = ({todos}: RootState) => todos;

export const selectSavedTodos = createSelector(
  selectTodosData,
  ({todos}) => todos,
);
