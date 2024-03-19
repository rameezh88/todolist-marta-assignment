import React from 'react';
import {Swipeable} from 'react-native-gesture-handler';
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
import {renderTodoListItemRightActions} from './utils';

interface TodoListItemProps {
  item: TodoItem;
  onDelete: (item: TodoItem) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({item, onDelete}) => {
  const handleDelete = () => {
    onDelete?.(item);
  };

  return (
    <Swipeable
      onSwipeableWillClose={handleDelete}
      renderRightActions={renderTodoListItemRightActions}>
      <TodoItemContainer>
        <Checkbox />
        <TextContainer>
          <Title>{item.title}</Title>
          {item.description && <Description>{item.description}</Description>}
          {item.dueDate && (
            <DueDate>{`Due ${getFormattedDate(
              new Date(item.dueDate),
            )}`}</DueDate>
          )}
        </TextContainer>
        {item.priority && (
          <PriorityContainer priority={item.priority}>
            <Priority>{getPriorityText(item.priority)}</Priority>
          </PriorityContainer>
        )}
      </TodoItemContainer>
    </Swipeable>
  );
};

export default TodoListItem;
