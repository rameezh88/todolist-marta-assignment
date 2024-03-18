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
        {item.description && <Description>{item.description}</Description>}
        {item.dueDate && (
          <DueDate>{`Due ${getFormattedDate(new Date(item.dueDate))}`}</DueDate>
        )}
      </TextContainer>
      {item.priority && (
        <PriorityContainer priority={item.priority}>
          <Priority>{getPriorityText(item.priority)}</Priority>
        </PriorityContainer>
      )}
    </TodoItemContainer>
  );
};

export default TodoListItem;
