import styled from 'styled-components/native';

export const Container = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 150px;
  padding-horizontal: 10px;
`;

export const IconContainer = styled.View`
  flex-direction: column;
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 18px;
  margin-left: 10px;
`;
