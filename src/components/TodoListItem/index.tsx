import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Swipeable} from 'react-native-gesture-handler';
import {colors} from '../../constants/colors';
import {TodoItem} from '../../types';
import {getFormattedDate, getPriorityText} from '../../utils';
import {
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

  const onToggleCheckbox = (checked: boolean) => {
    handleToggleCheckbox?.(item, checked);
  };

  return (
    <Swipeable
      onSwipeableWillClose={handleDelete}
      renderRightActions={renderTodoListItemRightActions}>
      <TodoItemContainer>
        <BouncyCheckbox
          isChecked={item.completed}
          size={22}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          fillColor={colors.primary}
          unfillColor="#FFFFFF"
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
