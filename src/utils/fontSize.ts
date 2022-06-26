import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

export const fontSize = (size: number): number => {
	const fs = widthPercentageToDP(size);
	return fs;
};
