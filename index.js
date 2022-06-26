/**
 * @format
 */

import '@formatjs/intl-getcanonicallocales/polyfill';
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-displaynames/polyfill';
import '@formatjs/intl-displaynames/locale-data/en';
import '@formatjs/intl-listformat/polyfill';
import '@formatjs/intl-listformat/locale-data/en'; // locale-data for en // locale-data for en
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en'; // locale-data for en
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en'; // locale-data for en
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en'; // locale-data for en
import '@formatjs/intl-datetimeformat/polyfill';
import '@formatjs/intl-datetimeformat/locale-data/en'; // locale-data for en
import '@formatjs/intl-datetimeformat/add-all-tz'; // Add ALL tz data
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import KeepAwake from 'react-native-keep-awake';

import App from './src/App';
import { name as appName } from './app.json';

// eslint-disable-next-line no-undef
if (__DEV__) {
	KeepAwake.activate();
}

AppRegistry.registerComponent(appName, () => App);
