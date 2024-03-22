import {createSlice} from '@reduxjs/toolkit';

export interface PaginationState {
  // Variables used for pagination logic.
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 20,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      // Set the current page number, which will cause the relevant page to be fetched.
      state.currentPage = action.payload;
    },
  },
});

export const {setCurrentPage} = paginationSlice.actions;

export default paginationSlice.reducer;
