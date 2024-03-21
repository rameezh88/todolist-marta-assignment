import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {sortBySortOption} from '../../../utils';
import {selectCurrentPage, selectItemsPerPage} from '../pagination/selectors';

export const selectTodosData = ({todos}: RootState) => todos;

export const selectSortOption = createSelector(
  selectTodosData,
  ({sortOption}) => sortOption,
);

export const selectSavedSortedTodos = createSelector(
  selectTodosData,
  ({todos, sortOption}) => sortBySortOption(todos, sortOption),
);

export const selectTodosCount = createSelector(
  selectTodosData,
  ({todos}) => todos.length,
);

export const selectSortedPaginatedItems = createSelector(
  [selectSavedSortedTodos, selectCurrentPage, selectItemsPerPage],
  (sortedTodos, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return sortedTodos.slice(startIndex, endIndex);
  },
);
