import styled from 'styled-components/native';
import CustomTextInput from '../../components/CustomTextInput';
import {colors} from '../../constants/colors';

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

export const SaveButton = styled.Pressable`
  background-color: ${colors.primary};
  height: 50px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const SaveButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

export const HeaderButton = styled.Pressable`
  margin-horizontal: 15px;
`;
