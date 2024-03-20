import {useEffect} from 'react';
import {selectTodosData} from '../redux/reducers/todos/selectors';
import {syncTodosToBackend} from '../api';
import {useDispatch, useSelector} from 'react-redux';
import useAppState from './useAppState';

// Hook that syncs the data from the Redux store with the backend.
const useSyncTodoData = () => {
  const dispatch = useDispatch();
  const todoData = useSelector(selectTodosData);

  const {appInForeground} = useAppState();

  useEffect(() => {
    const timer = setInterval(() => {
      if (todoData) {
        // Sync todo data with the backend every 20 seconds.
        syncTodosToBackend(todoData, dispatch);
      }
    }, 20000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoData]);

  useEffect(() => {
    if (appInForeground && todoData) {
      // App in foreground. Syncing todo data with backend
      syncTodosToBackend(todoData, dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appInForeground, todoData]);
};

export default useSyncTodoData;
