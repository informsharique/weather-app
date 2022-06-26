import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFlipper } from '@react-navigation/devtools';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import store from '@redux/store';
import { Home } from '@navigation/stack';

const App: React.FC = () => {
	const navigationRef = useRef();
	useFlipper(navigationRef);
	return (
		<NavigationContainer ref={navigationRef}>
			<Home />
		</NavigationContainer>
	);
};

const persistor = persistStore(store);

const WrappedApp: React.FC = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<SafeAreaProvider>
					<App />
				</SafeAreaProvider>
			</PersistGate>
		</Provider>
	);
};

export default WrappedApp;
