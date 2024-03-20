import React from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import {colors} from '../../constants/colors';
import {TodoItem} from '../../types';
import {getFormattedDate, getPriorityText} from '../../utils';
import {
  Description,
  DueDate,
  EditButton,
  Priority,
  PriorityContainer,
  RightContainer,
  TextContainer,
  Title,
  TodoCheckBox,
  TodoItemContainer,
} from './styles';
import {renderTodoListItemRightActions} from './utils';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
        <RightContainer>
          {item.priority && (
            <PriorityContainer priority={item.priority}>
              <Priority>{getPriorityText(item.priority)}</Priority>
            </PriorityContainer>
          )}
          <EditButton>
            <Ionicons name="create-outline" size={25} color="grey" />
          </EditButton>
        </RightContainer>
      </TodoItemContainer>
    </Swipeable>
  );
};

export default TodoListItem;
