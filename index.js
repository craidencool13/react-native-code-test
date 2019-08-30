import { AppRegistry } from 'react-native';
import App from './app/index';

XMLHttpRequest = GLOBAL.originalXMLHttpRequest ? GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;

AppRegistry.registerComponent('Ombori', () => App);
