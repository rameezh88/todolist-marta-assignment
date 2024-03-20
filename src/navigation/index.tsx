import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AddEditTodoItemScreen} from '../screens/AddEditTodoItemScreen';
import {colors} from '../constants/colors';
import HomeScreen from '../screens/HomeScreen';
import {TodoItem} from '../types';
import useSyncTodoData from '../hooks/useSyncTodoData';

export type RootStackParamList = {
  HomeScreen: undefined;
  AddEditTodoItemScreen: {
    mode?: 'new ' | 'edit';
    item?: TodoItem;
  };
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  useSyncTodoData();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {backgroundColor: colors.primary},
      }}
      initialRouteName="HomeScreen">
      <RootStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <RootStack.Screen
        name="AddEditTodoItemScreen"
        component={AddEditTodoItemScreen}
        options={({route}) => ({
          title:
            route.params?.mode === 'edit' ? 'Edit Todo Item' : 'Add Todo Item',
          headerShown: true,
          presentation: 'modal',
        })}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
