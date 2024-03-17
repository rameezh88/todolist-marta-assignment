import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlashList} from '@shopify/flash-list';
import React, {useMemo} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HomeHeader} from '../../components/HomeHeader';
import {SortOption} from '../../components/SortButton';
import TodoListItem from '../../components/TodoListItem';
import {RootStackParamList} from '../../navigation';
import {AddNewItemButton, Container, Placeholder} from './styles';
import {sortBySortOption} from '../../utils';

const todoListItems = require('../../dummy/dummyTodoListItems.json');

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const todoItems: any[] = todoListItems;
  const [sortOption, setSortOption] = React.useState<SortOption>('dueDate');

  const handleSortOptionChange = (option: SortOption) => {
    setSortOption(option);
  };

  const sortedList = useMemo(
    () => sortBySortOption(todoItems, sortOption),
    [sortOption, todoItems],
  );

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
          data={sortedList}
          ListHeaderComponent={
            <HomeHeader onSortOptionChange={handleSortOptionChange} />
          }
          keyExtractor={item => item.id}
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
