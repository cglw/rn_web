/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Root } from '@/Application';

AppRegistry.registerComponent(appName, () => Root);
console.disableYellowBox = true;
