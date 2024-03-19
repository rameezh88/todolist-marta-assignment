import styled from 'styled-components/native';
import {TodoItemPriority} from '../../types';
import {colors} from '../../constants/colors';

export const TodoItemContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px;
  background: white;
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
  margin-top: 8px;
  font-size: 11px;
  color: grey;
`;

export const PriorityContainer = styled.View<{priority: TodoItemPriority}>`
  padding: 2px 8px;
  border-radius: 5px;
  background: ${props => {
    switch (props.priority) {
      case 1:
        return colors.priority.high;
      case 2:
        return colors.priority.medium;
      case 3:
        return colors.priority.low;
      default:
        return 'transparent';
    }
  }};
`;

export const Priority = styled.Text`
  font-size: 12px;
  color: white;
`;

export const DeleteButtonContainer = styled.View`
  padding: 2px 8px;
`;
