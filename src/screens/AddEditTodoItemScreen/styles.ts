import styled from 'styled-components/native';
import CustomTextInput from '../../components/CustomTextInput';

export const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    justifyContent: 'space-around',
    gap: 15,
  },
}))`
  flex: 1;
  flex-direction: column;
  align-content: center;
  padding: 15px;
`;

export const TitleInput = styled(CustomTextInput)``;

export const DescriptionInput = styled(CustomTextInput)`
  height: 100px;
`;
