import React from 'react';
import {TextInputProps} from 'react-native';
import {Container, Input, InputContainer, ValidationMessage} from './styles';

interface CustomTextInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  isValid?: boolean;
  validationMessage?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  isValid,
  validationMessage,
  ...restProps
}) => {
  return (
    <Container>
      <InputContainer isValid={isValid}>
        <Input value={value} onChangeText={onChangeText} {...restProps} />
      </InputContainer>
      {isValid === false && (
        <ValidationMessage>{validationMessage}</ValidationMessage>
      )}
    </Container>
  );
};

export default CustomTextInput;
