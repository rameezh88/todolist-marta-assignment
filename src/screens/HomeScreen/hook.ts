import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SortOption} from '../../components/SortButton';
import {RootStackParamList} from '../../navigation';
import {
  deleteTodoItem,
  setSortOption,
  setTodoCompletedState,
} from '../../redux/reducers/todos';
import {selectSavedSortedTodos} from '../../redux/reducers/todos/selectors';
import {TodoItem} from '../../types';
import {sortBySortOption} from '../../utils';

// const dummyData: TodoItem[] = require('../../dummy/dummyTodoListItems.json');

// function getRandomIntInclusive(min, max) {
//   const minCeiled = Math.ceil(min);
//   const maxFloored = Math.floor(max);
//   return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
// }

const useHook = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const todoItems = useSelector(selectSavedSortedTodos);
  const [confirmationDialogVisible, setConfirmationDialogVisible] =
    React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<TodoItem | null>(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const items = dummyData.map(item => ({
  //     ...item,
  //     priority: getRandomIntInclusive(1, 4),
  //     id: makeId(20),
  //   }));
  //   dispatch(addTodoItems(items));
  //   // dispatch(clearAll());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleSortOptionChange = (option: SortOption) => {
    dispatch(setSortOption(option));
  };

  const handleDelete = (item: TodoItem) => {
    setItemToDelete(item);
    setConfirmationDialogVisible(true);
  };

  const handleDeletionDialogConfirm = () => {
    if (itemToDelete) {
      dispatch(deleteTodoItem(itemToDelete?.id));
    }
  };

  const handleHideDeleteConfirmationDialog = () => {
    setItemToDelete(null);
    setConfirmationDialogVisible(false);
  };

  const handleToggleCompletedState = (item: TodoItem, checked: boolean) => {
    dispatch(
      setTodoCompletedState({
        id: item.id,
        completed: checked,
      }),
    );
  };

  const handleCreatePressed = () => {
    navigation.navigate('AddEditTodoItemScreen');
  };

  const handleEditPressed = (item: TodoItem) => {
    navigation.navigate('AddEditTodoItemScreen', {mode: 'edit', item});
  };

  return {
    todoItems,
    confirmationDialogVisible,
    handleDelete,
    handleHideDeleteConfirmationDialog,
    handleSortOptionChange,
    handleDeletionDialogConfirm,
    handleToggleCompletedState,
    handleCreatePressed,
    handleEditPressed,
  };
};

export default useHook;
