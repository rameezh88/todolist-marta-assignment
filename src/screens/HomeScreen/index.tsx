import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlashList} from '@shopify/flash-list';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../../navigation';
import {Container, Placeholder, AddNewItemButton} from './styles';
import TodoListItem from '../../components/TodoListItem';

const todoListItems = require('../../dummy/dummyTodoListItems.json');

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const todoItems: any[] = todoListItems;

  return (
    <Container>
      {/* Show a placeholder when we have no todoItems */}
      {!todoItems ||
        (todoItems.length === 0 && (
          <Placeholder>
            {`This is where your todo items are shown.\n\nClick on the button below to add a new one!`}{' '}
          </Placeholder>
        ))}
      {todoItems && (
        <FlashList
          data={todoItems}
          keyExtractor={item => item.title + item.description}
          renderItem={({item}) => <TodoListItem item={item} />}
          estimatedItemSize={200}
        />
      )}
      <AddNewItemButton
        onPress={() => navigation.navigate('AddEditTodoItemScreen')}>
        <Ionicons name="add-outline" size={32} color="white" />
      </AddNewItemButton>
    </Container>
  );
};

export default HomeScreen;
