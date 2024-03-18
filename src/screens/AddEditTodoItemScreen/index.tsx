import React, {useMemo, useState} from 'react';
import {
  Container,
  DescriptionInput,
  HeaderButton,
  SaveButton,
  SaveButtonText,
  TitleInput,
} from './styles';
import {TodoItemPriority} from '../../types';
import PrioritySelector from '../../components/PrioritySelector';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import DateTimeEntry from '../../components/DateTimeEntry';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function AddEditTodoItemScreen() {
  const navigation = useNavigation();
  const {params} =
    useRoute<RouteProp<RootStackParamList, 'AddEditTodoItemScreen'>>();

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

  const handleSavePress = () => {
    setIsEditing(false);
    // Save the todo item
  };

  const handleClosePress = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <TitleInput
        value={title}
        placeholder="Enter title"
        validationMessage="Title cannot be empty"
        onChangeText={handleTitleChange}
        isValid={titleIsValid}
        autoCorrect={false}
      />
      <DescriptionInput
        value={description}
        placeholder="Enter description"
        onChangeText={handleDescriptionChange}
        autoCorrect={false}
        multiline
      />
      <PrioritySelector onPriorityChange={handleOnPriorityChange} />
      <DateTimeEntry onValueChange={handleDateChange} />
      <SaveButton onPress={handleSavePress}>
        <SaveButtonText>
          {params?.mode === 'edit' ? 'Save changes' : 'Create todo'}
        </SaveButtonText>
      </SaveButton>
    </Container>
  );
}
