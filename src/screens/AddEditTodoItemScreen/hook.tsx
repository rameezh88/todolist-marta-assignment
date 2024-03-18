import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import React, {useState, useMemo} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../../navigation';
import {TodoItemPriority} from '../../types';
import {HeaderButton} from './styles';
import {useDispatch} from 'react-redux';
import {createTodoItem} from '../../redux/reducers/todos';
import {makeId} from '../../utils';
import {debounce} from 'lodash';

const useHook = () => {
  const navigation = useNavigation();
  const {params} =
    useRoute<RouteProp<RootStackParamList, 'AddEditTodoItemScreen'>>();

  const dispatch = useDispatch();

  React.useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <HeaderButton onPress={handleSavePress}>
          <Ionicons name="checkmark-outline" size={32} color="white" />
        </HeaderButton>
      ),
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => (
        <HeaderButton onPress={handleClosePress}>
          <Ionicons name="close-outline" size={32} color="white" />
        </HeaderButton>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [priority, setPriority] = useState<TodoItemPriority | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(true);

  const handleTitleChange = (text: string) => {
    setIsEditing(true);
    setTitle(text);
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
  };

  const handleOnPriorityChange = (prio: TodoItemPriority) => {
    setPriority(prio);
  };

  const titleIsValid = useMemo(
    () => isEditing || title.length > 0,
    [title, isEditing],
  );

  const handleDateChange = (date: Date) => {
    setDueDate(date.toUTCString());
  };

  const debouncedSaveToStore = debounce(() => {
    dispatch(
      createTodoItem({
        title,
        description,
        dueDate,
        priority,
        completed: false,
        createdOn: new Date().toUTCString(),
        id: makeId(10), // Create a unique id for each todo item
      }),
    );
  }, 200);

  const handleSavePress = () => {
    setIsEditing(false);
    // Save the todo item
    debouncedSaveToStore();
    navigation.goBack();
  };

  const handleClosePress = () => {
    navigation.goBack();
  };

  return {
    handleDateChange,
    handleSavePress,
    handleTitleChange,
    handleDescriptionChange,
    handleOnPriorityChange,
    titleIsValid,
    title,
    description,
    params,
  };
};

export default useHook;
