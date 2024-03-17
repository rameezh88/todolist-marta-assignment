import React, {useState} from 'react';
import {TodoItemPriority} from '../../types';
import {
  Container,
  RadioButton,
  RadioContainer,
  RadioText,
  Selected,
} from './styles';

interface PrioritySelectorProps {
  onPriorityChange: (priority: TodoItemPriority) => void;
}

const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  onPriorityChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<TodoItemPriority | null>(
    null,
  );

  const handleOptionSelect = (option: TodoItemPriority) => {
    setSelectedOption(option);
    onPriorityChange(option);
  };

  return (
    <Container>
      <RadioContainer onPress={() => handleOptionSelect(1)}>
        <RadioButton>{selectedOption === 1 && <Selected />}</RadioButton>
        <RadioText>High</RadioText>
      </RadioContainer>
      <RadioContainer onPress={() => handleOptionSelect(2)}>
        <RadioButton>{selectedOption === 2 && <Selected />}</RadioButton>
        <RadioText>Medium</RadioText>
      </RadioContainer>
      <RadioContainer onPress={() => handleOptionSelect(3)}>
        <RadioButton>{selectedOption === 3 && <Selected />}</RadioButton>
        <RadioText>Low</RadioText>
      </RadioContainer>
    </Container>
  );
};

export default PrioritySelector;
