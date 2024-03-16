import styled from 'styled-components/native';

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
`;

export const DueDate = styled.Text`
  font-size: 16px;
`;
