import React, { Component } from 'react';
import './index';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './router/RouterConfig';
import { isReadyRef, navigationRef } from './sdk/router/RootNavigation';
import { Provider } from 'mobx-react';
import { StatusBar } from 'react-native';
type RootDrawerParamList = {
  [key: string]: any;
};
const Stack = createStackNavigator<RootDrawerParamList>();

const HeaderNull = function (): React.ReactNode {
  return null;
};
function MyStack() {
  return (
    <Stack.Navigator initialRouteName={'demos'}>
      {(Object.keys(routes) as (keyof typeof routes)[]).map(name => (
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

const MyApp = function () {
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
      onStateChange={async state => {
        console.info('onStateChange');

        window.document.title = '测试';
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

type State = {
  isLoadEnd: boolean;
};
export class Root extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoadEnd: false,
    };
  }
  componentDidMount() {
    globalStore.syncCallBack(() => {
      console.info('sync load end');
      this.setState({
        isLoadEnd: true,
      });
    });
    console.info('globalStore.actionStore');
    console.info(globalStore.actionStore);
  }

  render() {
    return (
      <Provider store={globalStore}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        {this.state.isLoadEnd ? <MyApp /> : null}
      </Provider>
    );
  }
}

// export const Root = () => {
//   const [isLoadEnd, setLoadEnd] = useState(false);
//   console.info('globalStore.rootStore');
//   console.info(globalStore);
//   // globalStore.get().actionStr;
//   globalStore.syncCallBack(() => {
//     console.info('sync load end');
//     setLoadEnd(true);
//   });
//   return (
//     <Provider store={globalStore}>
//       <StatusBar
//         translucent={true}
//         backgroundColor="transparent"
//         barStyle="dark-content"
//       />
//       {isLoadEnd ? <MyApp /> : null}
//     </Provider>
//   );
// };
