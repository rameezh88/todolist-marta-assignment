import React from 'react';
import {TodoItem} from '../../types';
import {getFormattedDate, getPriorityText} from '../../utils';
import {
  Checkbox,
  Description,
  DueDate,
  Priority,
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
      <Priority priority={item.priority}>
        {getPriorityText(item.priority)}
      </Priority>
    </TodoItemContainer>
  );
};

export default TodoListItem;
