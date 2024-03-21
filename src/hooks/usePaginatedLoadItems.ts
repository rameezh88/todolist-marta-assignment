import {useDispatch, useSelector} from 'react-redux';
import {selectSortedPaginatedItems} from '../redux/reducers/todos/selectors';
import {throttle} from 'lodash';
import {useEffect, useState} from 'react';
import {setCurrentPage as setStoreCurrentPage} from '../redux/reducers/pagination';
import {TodoItem} from '../types';
import {
  selectCurrentPage,
  selectTotalPages,
} from '../redux/reducers/pagination/selectors';

const usePaginatedLoadItems = () => {
  const todoItemsFromStore = useSelector(selectSortedPaginatedItems);
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  const totalPages = useSelector(selectTotalPages);

  const currentPageInStore = useSelector(selectCurrentPage);
  const [currentPage, setCurrentPage] = useState(currentPageInStore);
  const dispatch = useDispatch();

  useEffect(() => {
    if (todoItemsFromStore) {
      setTodoItems(currentItems => [...currentItems, ...todoItemsFromStore]);
    }
  }, [todoItemsFromStore]);

  const debouncedLoadNextPage = throttle(() => {
    if (currentPage < totalPages) {
      dispatch(setStoreCurrentPage(currentPage + 1));
      setCurrentPage(prevPage => prevPage + 1);
    } else {
      // console.log('No more pages to load');
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
