import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DeleteButtonContainer} from './styles';

export const renderTodoListItemRightActions = (
  _: Animated.AnimatedInterpolation<any>,
  dragX: Animated.AnimatedInterpolation<any>,
) => {
  const opacity = dragX.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.swipedRow, {opacity}]}>
      <DeleteButtonContainer>
        <Ionicons name="trash-outline" size={20} color="white" />
      </DeleteButtonContainer>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  swipedRow: {
    flexDirection: 'row-reverse',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#b60000',
  },
});
