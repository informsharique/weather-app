module.exports = (api) => {
	api.cache(true);

	const presets = ['module:metro-react-native-babel-preset'];
	const plugins = [
		[
			'module-resolver',
			{
				extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.jsx', '.json'],
				alias: {
					'@components': ['./src/components'],
					'@constants': ['./src/constants'],
					'@screens': ['./src/screens'],
					'@hooks': ['./src/hooks'],
					'@redux': ['./src/redux'],
					'@utils': ['./src/utils'],
					'@api': ['./src/api'],
					'@navigation': ['./src/navigation'],
					'@selectors': ['./src/selectors'],
				},
			},
		],
		[
			'formatjs',
			{
				idInterpolationPattern: '[sha512:contenthash:base64:6]',
				ast: true,
			},
		],
		'react-native-reanimated/plugin',
	];

	return {
		presets,
		plugins,
	};
};
