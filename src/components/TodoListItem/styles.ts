import styled from 'styled-components/native';
import {TodoItemPriority} from '../../types';
import {colors} from '../../constants/colors';

// Styled components for the todo list item
export const TodoItemContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px;
`;

export const Checkbox = styled.View`
  width: 20px;
  height: 20px;
  border: 2px solid #333;
  border-radius: 5px;
  margin-right: 10px;
  margin-top: 2px;
`;

export const TextContainer = styled.View`
  flex: 1;
  margin-right: 10px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const Description = styled.Text`
  font-size: 14px;
  font-style: italic;
  margin-top: 5px;
`;

export const DueDate = styled.Text`
  margin-top: 5px;
  font-size: 16px;
`;

export const Priority = styled.Text<{priority: TodoItemPriority}>`
  font-size: 16px;
  color: ${props => {
    switch (props.priority) {
      case 1:
        return colors.priority.high;
      case 2:
        return colors.priority.medium;
      case 3:
        return colors.priority.low;
    }
  }};
`;
