import React from 'react';
import {Container} from './styles';
import {SortButton, SortOption} from '../SortButton';

interface HomeHeaderProps {
  onSortOptionChange: (sortOption: SortOption) => void;
}

export function HomeHeader(props: HomeHeaderProps) {
  return (
    <Container>
      <SortButton {...props} />
    </Container>
  );
}
