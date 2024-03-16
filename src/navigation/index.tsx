import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {AddEditTodoItemScreen} from '../screens/AddEditTodoItemScreen';
import {colors} from '../constants/colors';

export type RootStackParamList = {
  HomeScreen: undefined;
  AddEditTodoItemScreen: {
    mode: 'new ' | 'edit';
  };
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
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
