import {Text} from 'react-native-paper';
import styled from 'styled-components/native';

export const Description = styled(Text).attrs(() => {
  return {
    variant: 'bodyLarge',
  };
})`
  margin-top: 20px;
`;
