import styled from 'styled-components/native';
import {colors} from '../../constants/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const DateTimeEntryFieldWrapper = styled.Pressable`
  flex-direction: row;
  width: 100%;
  margin-top: 20px;
  height: 50px;
  background-color: white;
  align-items: center;
  padding-horizontal: 10px;
  border-radius: 5px;
  border: 1px solid ${colors.secondary};
`;
