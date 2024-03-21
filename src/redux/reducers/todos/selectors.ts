import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {sortBySortOption} from '../../../utils';

export const selectTodosData = ({todos}: RootState) => todos;

export const selectSavedSortedTodos = createSelector(
  selectTodosData,
  ({todos, sortOption}) => sortBySortOption(todos, sortOption),
);
