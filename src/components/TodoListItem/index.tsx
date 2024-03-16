import React from 'react';
import {
  TodoItemContainer,
  Checkbox,
  TextContainer,
  Title,
  Description,
  DueDate,
} from './styles';
import {TodoItem} from '../../types';

interface TodoListItemProps {
  item: TodoItem;
}

const TodoListItem: React.FC<TodoListItemProps> = ({item}) => {
  return (
    <TodoItemContainer>
      <Checkbox />
      <TextContainer>
        <Title>{item.title}</Title>
        <Description>{item.description}</Description>
      </TextContainer>
      <DueDate>{new Date(item.dueDate * 1000).toLocaleDateString()}</DueDate>
    </TodoItemContainer>
  );
};

export default TodoListItem;
