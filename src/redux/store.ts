import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import todos from './reducers/todos';
import pagination from './reducers/pagination';
import todosListenerMiddleware from './reducers/todos/middlewares';

const createDebugger = require('redux-flipper').default;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  safelist: ['todos'],
  blacklist: ['pagination'],
};

const rootReducer = combineReducers({
  todos,
  pagination,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .prepend(todosListenerMiddleware.middleware)
      .concat(createDebugger()),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
