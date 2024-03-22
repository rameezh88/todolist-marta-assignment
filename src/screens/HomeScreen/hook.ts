import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {useDispatch} from 'react-redux';
import {SortOption} from '../../components/SortButton';
import usePaginatedLoadItems from '../../hooks/usePaginatedLoadItems';
import {RootStackParamList} from '../../navigation';
import {setCurrentPage} from '../../redux/reducers/pagination';
import {
  deleteTodoItem,
  setSortOption,
  setTodoCompletedState,
} from '../../redux/reducers/todos';
import {TodoItem} from '../../types';

const useHook = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [confirmationDialogVisible, setConfirmationDialogVisible] =
    React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<TodoItem | null>(null);
  const dispatch = useDispatch();

  const {todoItems, loadNextPage} = usePaginatedLoadItems();

  const handleSortOptionChange = (option: SortOption) => {
    dispatch(setSortOption(option));
    dispatch(setCurrentPage(1));
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
    navigation.navigate('AddEditTodoItemScreen', {});
  };

  const handleEditPressed = (item: TodoItem) => {
    navigation.navigate('AddEditTodoItemScreen', {mode: 'edit', item});
  };

  const handleScrollEndReached = () => {
    loadNextPage();
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
    handleScrollEndReached,
  };
};

export default useHook;
