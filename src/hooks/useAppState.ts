import {useRef, useState, useEffect} from 'react';
import {AppState} from 'react-native';

// Hook into the app state to determine if the app is in foreground or background.
const useAppState = () => {
  const appState = useRef(AppState.currentState);
  const [appInForeground, setAppInForeground] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App has come to the foreground!
        setAppInForeground(true);
      } else {
        // App has gone to the background!
        setAppInForeground(false);
      }

      appState.current = nextAppState;
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    appInForeground,
  };
};

export default useAppState;
