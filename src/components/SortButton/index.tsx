import React, {useEffect, useMemo, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, IconContainer, Title} from './styles';

export type SortOption = 'dueDate' | 'priority' | 'createdOn';

interface SortButtonProps {
  onSortOptionChange: (sortOption: SortOption) => void;
}

const ICON_SIZE = 14;

const sortOptions = ['dueDate', 'priority', 'createdOn'];

export function SortButton({onSortOptionChange}: SortButtonProps) {
  const [current, setCurrent] = useState<number>(0);

  const handleOnPress = () => {
    setCurrent(curr => (curr + 1) % sortOptions.length);
  };

  useEffect(() => {
    onSortOptionChange(sortOptions[current] as SortOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const sortOption = useMemo(() => {
    switch (sortOptions[current]) {
      case 'dueDate':
        return 'Due Date';
      case 'priority':
        return 'Priority';
      case 'createdOn':
        return 'Created On';
      default:
        return 'Due Date';
    }
  }, [current]);

  return (
    <Container onPress={handleOnPress}>
      <IconContainer>
        <Ionicons name="chevron-up-outline" size={ICON_SIZE} color="grey" />
        <Ionicons name="chevron-down-outline" size={ICON_SIZE} color="grey" />
      </IconContainer>
      <Title>{sortOption}</Title>
    </Container>
  );
}
