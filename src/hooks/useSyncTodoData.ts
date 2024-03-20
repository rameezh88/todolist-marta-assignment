import {useEffect} from 'react';
import {selectTodosData} from '../redux/reducers/todos/selectors';
import {syncTodosToBackend} from '../api';
import {useDispatch, useSelector} from 'react-redux';
import useAppState from './useAppState';

const useSyncTodoData = () => {
  const dispatch = useDispatch();
  const todoData = useSelector(selectTodosData);

  const {appInForeground} = useAppState();

  useEffect(() => {
    if (appInForeground) {
      // App in foreground. Syncing todo data to backend
      syncTodosToBackend(todoData, dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appInForeground]);
};

export default useSyncTodoData;
