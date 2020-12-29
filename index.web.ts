import {AppRegistry} from 'react-native';
import json from './app.json';
import {MyApp} from './src/application';
AppRegistry.registerComponent(json.name, () => MyApp);

AppRegistry.runApplication(json.name, {
  rootTag: document.getElementById('react-app'),
});
