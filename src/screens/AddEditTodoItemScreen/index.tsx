import React, {useMemo, useState} from 'react';
import {
  Container,
  DescriptionInput,
  SaveButton,
  SaveButtonText,
  TitleInput,
} from './styles';
import {TodoItemPriority} from '../../types';
import PrioritySelector from '../../components/PrioritySelector';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import DateTimeEntry from '../../components/DateTimeEntry';

export function AddEditTodoItemScreen() {
  const {params} =
    useRoute<RouteProp<RootStackParamList, 'AddEditTodoItemScreen'>>();

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
