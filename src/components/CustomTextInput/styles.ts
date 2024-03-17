import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 10px;
`;

export const InputContainer = styled.View<{isValid?: boolean}>`
  padding-horizontal: 10px;
  padding-vertical: 5px;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${props => (props.isValid === false ? 'red' : 'gray')};
`;

export const Input = styled.TextInput`
  height: 40px;
`;

export const ValidationMessage = styled.Text`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;
