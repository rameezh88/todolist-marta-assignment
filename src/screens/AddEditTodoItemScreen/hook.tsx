import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import React, {useState, useMemo, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TodoItemPriority} from '../../types';
import {HeaderButton} from './styles';
import {useDispatch} from 'react-redux';
import {
  createTodoItem,
  saveChangesToTodoItem,
} from '../../redux/reducers/todos';
import {makeId} from '../../utils';
import {debounce} from 'lodash';
import {RootStackParamList} from '../../navigation';

const useHook = () => {
  const navigation = useNavigation();
  const {params} =
    useRoute<RouteProp<RootStackParamList, 'AddEditTodoItemScreen'>>();

  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>(params?.item?.title ?? '');
  const [description, setDescription] = useState<string>(
    params?.item?.description ?? '',
  );
  const [dueDate, setDueDate] = useState<string>(params?.item?.dueDate ?? '');
  const [priority, setPriority] = useState<TodoItemPriority>(
    params?.item?.priority ?? 4,
  );
  const [isEditing, setIsEditing] = useState<boolean>(true);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton onPress={handleSavePress}>
          <Ionicons name="checkmark-outline" size={32} color="white" />
        </HeaderButton>
      ),
      headerLeft: () => (
        <HeaderButton onPress={handleClosePress}>
          <Ionicons name="close-outline" size={32} color="white" />
        </HeaderButton>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

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
    if (params?.mode === 'edit') {
      if (params?.item) {
        const {item} = params;
        dispatch(
          saveChangesToTodoItem({
            ...item,
            title,
            description,
            dueDate,
            priority,
            updated: new Date().toISOString(),
          }),
        );
      }
    } else {
      dispatch(
        createTodoItem({
          title,
          description,
          dueDate,
          priority,
          completed: false,
          createdOn: new Date().toISOString(),
          updated: new Date().toISOString(),
          id: makeId(10), // Create a unique id for each todo item
        }),
      );
    }
  }, 200);

  useEffect(() => {
    if (!isEditing && titleIsValid) {
      // Save the todo item
      debouncedSaveToStore();
      navigation.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, titleIsValid]);

  const handleSavePress = () => {
    setIsEditing(false);
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
    priority,
    description,
    dueDate,
    params,
  };
};

export default useHook;
