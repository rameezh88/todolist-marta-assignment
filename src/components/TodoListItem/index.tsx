import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Swipeable} from 'react-native-gesture-handler';
import {colors} from '../../constants/colors';
import {TodoItem} from '../../types';
import {getFormattedDate, getPriorityText} from '../../utils';
import {
  CheckBoxContainer,
  Description,
  DueDate,
  Priority,
  PriorityContainer,
  TextContainer,
  Title,
  TodoCheckBox,
  TodoItemContainer,
} from './styles';
import {renderTodoListItemRightActions} from './utils';
import {Checkbox} from 'react-native-paper';

interface TodoListItemProps {
  item: TodoItem;
  handleToggleCheckbox: (item: TodoItem, checked: boolean) => void;
  onDelete: (item: TodoItem) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  item,
  onDelete,
  handleToggleCheckbox,
}) => {
  const handleDelete = () => {
    onDelete?.(item);
  };

  const onToggleCheckbox = () => {
    handleToggleCheckbox?.(item, !item.completed);
  };

  return (
    <Swipeable
      onSwipeableWillClose={handleDelete}
      renderRightActions={renderTodoListItemRightActions}>
      <TodoItemContainer>
        <TodoCheckBox
          status={item.completed ? 'checked' : 'unchecked'}
          color={colors.primary}
          uncheckedColor={colors.secondary}
          onPress={onToggleCheckbox}
        />
        <TextContainer>
          <Title>{item.title}</Title>
          {item.description && <Description>{item.description}</Description>}
          {item.dueDate && (
            <DueDate>{`Due ${getFormattedDate(
              new Date(item.dueDate),
            )}`}</DueDate>
          )}
          {__DEV__ && (
            <DueDate>{`Created: ${getFormattedDate(
              new Date(item.createdOn),
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
