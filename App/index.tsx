/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from '../src/navigation';
import {AppSafeAreaView} from './styles';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <AppSafeAreaView>
        <StatusBar barStyle={'dark-content'} />
        <RootNavigator />
      </AppSafeAreaView>
    </NavigationContainer>
  );
}

export default App;
