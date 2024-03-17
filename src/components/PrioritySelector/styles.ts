import styled from 'styled-components/native';
import {colors} from '../../constants/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  gap: 10px;
`;

export const RadioContainer = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const RadioButton = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border-width: 2px;
  border-color: ${colors.primary};
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export const RadioText = styled.Text`
  font-size: 16px;
`;

export const Selected = styled.View`
  background-color: ${colors.primary};
  width: 10px;
  height: 10px;
  border-radius: 5px;
`;
