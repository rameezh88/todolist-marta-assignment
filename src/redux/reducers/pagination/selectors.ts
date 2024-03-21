import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../store';

export const selectPaginationData = ({pagination}: RootState) => pagination;

export const selectCurrentPage = createSelector(
  selectPaginationData,
  ({currentPage}) => currentPage,
);

export const selectItemsPerPage = createSelector(
  selectPaginationData,
  ({itemsPerPage}) => itemsPerPage,
);
