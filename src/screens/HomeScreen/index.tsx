import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlashList} from '@shopify/flash-list';
import React, {useMemo} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {HomeHeader} from '../../components/HomeHeader';
import {SortOption} from '../../components/SortButton';
import TodoListItem from '../../components/TodoListItem';
import {RootStackParamList} from '../../navigation';
import {selectSavedTodos} from '../../redux/reducers/todos/selectors';
import {TodoItem} from '../../types';
import {sortBySortOption} from '../../utils';
import {AddNewItemButton, Container, Placeholder} from './styles';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const todoItems = useSelector(selectSavedTodos);
  const [sortOption, setSortOption] = React.useState<SortOption>('dueDate');
  // const dispatch = useDispatch();

  const handleSortOptionChange = (option: SortOption) => {
    setSortOption(option);
  };

  const sortedList = useMemo(
    () => sortBySortOption(todoItems, sortOption),
    [sortOption, todoItems],
  );

  const handleDelete = (item: TodoItem) => {
    // console.log('Should delete item', item);
    // Show confirmation dialog for deletion
    // dispatch(deleteTodoItem(item.id));
  };

  return (
    <Container>
      {/* Show a placeholder when we have no todoItems */}
      {!todoItems ||
        (todoItems.length === 0 && (
          <Placeholder>
            {`This is where your todo items are shown.\n\nClick on the button below to add a new one!`}
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
            <TodoListItem onDelete={handleDelete} item={item} />
          )}
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
