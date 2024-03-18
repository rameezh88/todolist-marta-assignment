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
import persistStore from 'redux-persist/es/persistStore';
import store from '../src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

const persistor = persistStore(store);

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <PaperProvider>
            <AppSafeAreaView>
              <StatusBar barStyle={'dark-content'} />
              <RootNavigator />
            </AppSafeAreaView>
          </PaperProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
