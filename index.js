/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from './public/i18n'

AppRegistry.registerComponent(appName, () => App);

