import React from 'react';
import DateTimeEntry from '../../components/DateTimeEntry';
import PrioritySelector from '../../components/PrioritySelector';
import useHook from './hook';
import {
  Container,
  DescriptionInput,
  SaveButton,
  SaveButtonText,
  TitleInput,
} from './styles';

export function AddEditTodoItemScreen() {
  const {
    handleDateChange,
    handleSavePress,
    handleTitleChange,
    handleDescriptionChange,
    handleOnPriorityChange,
    titleIsValid,
    title,
    priority,
    description,
    params,
    dueDate,
  } = useHook();

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
      <PrioritySelector
        value={priority}
        onPriorityChange={handleOnPriorityChange}
      />
      <DateTimeEntry value={dueDate} onValueChange={handleDateChange} />
      <SaveButton onPress={handleSavePress}>
        <SaveButtonText>
          {params?.mode === 'edit' ? 'Save changes' : 'Create todo'}
        </SaveButtonText>
      </SaveButton>
    </Container>
  );
}
