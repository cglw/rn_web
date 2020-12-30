import React from 'react';
import './typings/global';
import './module_common/i18n/string-extensions';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import routes from './router/config';
import {isReadyRef, navigationRef} from './router/RootNavigation';
type RootDrawerParamList = {
  [key: string]: any;
};
const Stack = createStackNavigator<RootDrawerParamList>();

const HeaderNull = function (): React.ReactNode {
  return null;
};

function MyStack() {
  return (
    <Stack.Navigator initialRouteName={'index'}>
      {(Object.keys(routes) as (keyof typeof routes)[]).map((name) => (
        <Stack.Screen
          key={name}
          name={name}
          component={routes[name].screen}
          options={{
            header: () => HeaderNull(),
          }}
        />
      ))}
    </Stack.Navigator>
  );
}

export const MyApp = function () {
  const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';
  const config = {
    screens: {
      ...routes,
    },
  };

  const linking = {
    prefixes: ['http://localhost:9090', 'http://10.8.30.39:9090', 'test://'],
    config,
  };

  return (
    <NavigationContainer
      linking={linking}
      onReady={() => {
        isReadyRef.isReady = true;
      }}
      ref={navigationRef}
      onStateChange={async (state) => {
        console.info('onStateChange');
        console.info(state);
        try {
          await AsyncStorage.setItem(
            NAVIGATION_PERSISTENCE_KEY,
            JSON.stringify(state),
          );
        } catch (e) {
          console.log(e);
        }
      }}>
      {MyStack()}
    </NavigationContainer>
  );
};
