import {addEventListener as addNetInfoEventListener} from '@react-native-community/netinfo';
import {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {syncTodosToBackend} from '../api';
import {selectTodosData} from '../redux/reducers/todos/selectors';
import useAppState from './useAppState';

// Hook that syncs the data from the Redux store with the backend.
const useSyncTodoData = () => {
  const todoData = useSelector(selectTodosData);
  const internetConnected = useRef(false);

  const {appInForeground} = useAppState();

  useEffect(() => {
    const timer = setInterval(() => {
      if (todoData) {
        // Sync todo data with the backend every 20 seconds.
        syncTodosToBackend(todoData);
      }
    }, 10000);

    const unsubscribe = addNetInfoEventListener(state => {
      if (state.isConnected && !internetConnected.current) {
        // Sync data when Internet connection is re-established.
        syncTodosToBackend(todoData);
      }
      internetConnected.current = !!state.isConnected;
    });

    return () => {
      // Clear interval when component is unmounted
      clearInterval(timer);
      // Unsubscribe from NetInfo event listener
      unsubscribe();
    };
  }, [todoData]);

  useEffect(() => {
    if (appInForeground && todoData) {
      // App in foreground. Syncing todo data with backend
      syncTodosToBackend(todoData);
    }
  }, [appInForeground, todoData]);
};

export default useSyncTodoData;
