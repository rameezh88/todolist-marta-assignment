import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SortOption} from '../../components/SortButton';
import {RootStackParamList} from '../../navigation';
import {
  deleteTodoItem,
  setTodoCompletedState,
} from '../../redux/reducers/todos';
import {selectSavedTodos} from '../../redux/reducers/todos/selectors';
import {TodoItem} from '../../types';
import {sortBySortOption} from '../../utils';

const useHook = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const todoItems = useSelector(selectSavedTodos);
  const [sortOption, setSortOption] = React.useState<SortOption>('dueDate');
  const [confirmationDialogVisible, setConfirmationDialogVisible] =
    React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<TodoItem | null>(null);
  const dispatch = useDispatch();

  const handleSortOptionChange = (option: SortOption) => {
    setSortOption(option);
  };

  const sortedList = useMemo(
    () => sortBySortOption(todoItems, sortOption),
    [sortOption, todoItems],
  );

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
    sortedList,
    handleDeletionDialogConfirm,
    handleToggleCompletedState,
    handleCreatePressed,
    handleEditPressed,
  };
};

export default useHook;
