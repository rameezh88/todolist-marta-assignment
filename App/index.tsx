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
import {PaperProvider} from 'react-native-paper';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <PaperProvider>
        <AppSafeAreaView>
          <StatusBar barStyle={'dark-content'} />
          <RootNavigator />
        </AppSafeAreaView>
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;
