import React, {useMemo, useState} from 'react';
import {Container, DescriptionInput, TitleInput} from './styles';
import {TodoItemPriority} from '../../types';
import PrioritySelector from '../../components/PrioritySelector';

export function AddEditTodoItemScreen() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  // const [dueDate, setDueDate] = useState<string>('');
  const [priority, setPriority] = useState<TodoItemPriority | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(true);

  const handleTitleChange = (text: string) => {
    setTitle(text);
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
  };

  const handleOnPriorityChange = (prio: TodoItemPriority) => {
    setPriority(prio);
  };

  const titleIsValid = useMemo(
    () => !isEditing && title.length > 0,
    [title, isEditing],
  );

  return (
    <Container>
      <TitleInput
        value={title}
        placeholder="Enter title"
        validationMessage="Title cannot be empty"
        onChangeText={handleTitleChange}
        isValid={titleIsValid}
      />
      <DescriptionInput
        value={description}
        placeholder="Enter description"
        onChangeText={handleDescriptionChange}
        multiline
      />
      <PrioritySelector onPriorityChange={handleOnPriorityChange} />
    </Container>
  );
}
