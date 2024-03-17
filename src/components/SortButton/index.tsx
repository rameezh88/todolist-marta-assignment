import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, IconContainer, Title} from './styles';

export type SortOption = 'dueDate' | 'priority';

interface SortButtonProps {
  onSortOptionChange: (sortOption: SortOption) => void;
}

const ICON_SIZE = 14;

export function SortButton({onSortOptionChange}: SortButtonProps) {
  const [sortOption, setSortOption] = useState<SortOption>('dueDate');

  const handleOnPress = () => {
    setSortOption(sortOption === 'dueDate' ? 'priority' : 'dueDate');
  };

  useEffect(() => {
    onSortOptionChange(sortOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  return (
    <Container onPress={handleOnPress}>
      <IconContainer>
        <Ionicons name="chevron-up-outline" size={ICON_SIZE} color="grey" />
        <Ionicons name="chevron-down-outline" size={ICON_SIZE} color="grey" />
      </IconContainer>
      <Title>{sortOption === 'dueDate' ? 'Due date' : 'Priority'}</Title>
    </Container>
  );
}
