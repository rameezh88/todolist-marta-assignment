import {FlashList} from '@shopify/flash-list';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ConfirmationDialog} from '../../components/ConfirmationDialog';
import {HomeHeader} from '../../components/HomeHeader';
import TodoListItem from '../../components/TodoListItem';
import useHook from './hook';
import {AddNewItemButton, Container, Placeholder} from './styles';

const HomeScreen = () => {
  const {
    todoItems,
    confirmationDialogVisible,
    handleDelete,
    handleHideDeleteConfirmationDialog,
    handleSortOptionChange,
    sortedList,
    handleDeletionDialogConfirm,
    navigation,
    handleToggleCompletedState,
  } = useHook();

  return (
    <Container>
      {/* Show a placeholder when we have no todoItems */}
      {!todoItems ||
        (todoItems.length === 0 && (
          <Placeholder>
            {
              'This is where your todo items are shown.\n\nClick on the button below to add a new one!'
            }
          </Placeholder>
        ))}
      {todoItems && (
        <FlashList
          data={sortedList}
          ListHeaderComponent={
            <HomeHeader onSortOptionChange={handleSortOptionChange} />
          }
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TodoListItem
              handleToggleCheckbox={handleToggleCompletedState}
              onDelete={handleDelete}
              item={item}
            />
          )}
          estimatedItemSize={200}
        />
      )}
      <AddNewItemButton
        onPress={() => navigation.navigate('AddEditTodoItemScreen')}>
        <Ionicons name="add-outline" size={32} color="white" />
      </AddNewItemButton>
      <ConfirmationDialog
        title="Delete Todo Item"
        description="Are you sure you want to delete this todo item?"
        doneText="Delete"
        hideDialog={handleHideDeleteConfirmationDialog}
        onConfirm={handleDeletionDialogConfirm}
        visible={confirmationDialogVisible}
      />
    </Container>
  );
};

export default HomeScreen;
