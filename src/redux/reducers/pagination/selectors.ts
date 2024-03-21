import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {selectTodosCount} from '../todos/selectors';

export const selectPaginationData = ({pagination}: RootState) => pagination;

export const selectCurrentPage = createSelector(
  selectPaginationData,
  ({currentPage}) => currentPage,
);

export const selectItemsPerPage = createSelector(
  selectPaginationData,
  ({itemsPerPage}) => itemsPerPage,
);

export const selectTotalPages = createSelector(
  [selectTodosCount, selectItemsPerPage],
  (todosCount, itemsPerPage) => Math.ceil(todosCount / itemsPerPage),
);
