import { AppRegistry } from 'react-native';
import json from './app.json';
import { Root } from './src/Application';
AppRegistry.registerComponent(json.name, () => Root);

AppRegistry.runApplication(json.name, {
  rootTag: document.getElementById('react-app'),
});
