import React from 'react';
import {TodoItem} from '../../types';
import {getFormattedDate, getPriorityText} from '../../utils';
import {
  Checkbox,
  Description,
  DueDate,
  Priority,
  PriorityContainer,
  TextContainer,
  Title,
  TodoItemContainer,
} from './styles';

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
        <DueDate>{`Due ${getFormattedDate(
          new Date(item.dueDate * 1000),
        )}`}</DueDate>
      </TextContainer>
      <PriorityContainer priority={item.priority}>
        <Priority>{getPriorityText(item.priority)}</Priority>
      </PriorityContainer>
    </TodoItemContainer>
  );
};

export default TodoListItem;
