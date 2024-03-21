import {useDispatch, useSelector} from 'react-redux';
import {
  selectSortedPaginatedItems,
  selectTodosCount,
} from '../redux/reducers/todos/selectors';
import {throttle} from 'lodash';
import {useEffect, useState} from 'react';
import {setCurrentPage as setStoreCurrentPage} from '../redux/reducers/pagination';
import {TodoItem} from '../types';
import {
  selectCurrentPage,
  selectItemsPerPage,
} from '../redux/reducers/pagination/selectors';

const usePaginatedLoadItems = () => {
  const todoItemsFromStore = useSelector(selectSortedPaginatedItems);
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  const todosCount = useSelector(selectTodosCount);
  const itemsPerPage = useSelector(selectItemsPerPage);

  const currentPageInStore = useSelector(selectCurrentPage);
  const [currentPage, setCurrentPage] = useState(currentPageInStore);
  const dispatch = useDispatch();

  useEffect(() => {
    if (todoItemsFromStore) {
      // If page number is 1, replace the items, otherwise add them to the end of the list.
      setTodoItems(currentItems =>
        currentPageInStore > 1
          ? [...currentItems, ...todoItemsFromStore]
          : todoItemsFromStore,
      );
    }
  }, [todoItemsFromStore, currentPageInStore]);

  const debouncedLoadNextPage = throttle(() => {
    const totalPages = Math.ceil(todosCount / itemsPerPage);
    if (currentPage < totalPages) {
      // Only load the next page if the current page is less than the total number of pages.
      dispatch(setStoreCurrentPage(currentPage + 1));
      setCurrentPage(prevPage => prevPage + 1);
    }
  }, 200);

  const loadNextPage = () => {
    // Load next page
    debouncedLoadNextPage();
  };

  return {
    todoItems,
    loadNextPage,
  };
};

export default usePaginatedLoadItems;
