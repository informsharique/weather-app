import { PermissionsAndroid } from 'react-native';

export const checkPermission = (
	setHasPermission: React.Dispatch<boolean>,
	hasPermission: boolean,
	setError: React.Dispatch<Error>
) => {
	return async (): Promise<void> => {
		const hasLocationPermission = await PermissionsAndroid.check(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
		);
		setHasPermission(hasLocationPermission);
		if (hasPermission) {
			return;
		}
		if (!hasPermission) {
			try {
				const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					setHasPermission(true);
				} else {
					setHasPermission(false);
				}
			} catch (err) {
				setHasPermission(false);
				setError(err);
				console.error(err);
			}
		}
	};
};
