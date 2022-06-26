import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Svg, Path, LinearGradient, Stop, Defs, Text, Circle } from 'react-native-svg';

interface props {
	sunrise: string;
	sunset: string;
}

const HEIGHT = 180;
const y1 = HEIGHT / 4;
const y2 = HEIGHT / 3;
const y3 = HEIGHT / 2;
const y4 = HEIGHT - HEIGHT / 4;

const Sunrise: React.FC<props> = ({ sunrise, sunset }) => {
	const WIDTH = useWindowDimensions().width;
	return (
		<View style={styles.container}>
			<Svg height={HEIGHT} width={WIDTH}>
				<Defs>
					<LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
						<Stop offset="0" stopColor="#ffb52e" stopOpacity="1" />
						<Stop offset="1" stopColor="#ff5834" stopOpacity="1" />
					</LinearGradient>
					<LinearGradient id="sunrise" x1="0" y1="0" x2="1" y2="0">
						<Stop offset="0" stopColor="#ffb57e" stopOpacity="1" />
						<Stop offset="1" stopColor="#ff58a4" stopOpacity="1" />
					</LinearGradient>
					<LinearGradient id="sunset" x1="0" y1="0" x2="1" y2="0">
						<Stop offset="0" stopColor="#ffe8ba" stopOpacity="1" />
						<Stop offset="1" stopColor="#ffe097" stopOpacity="1" />
					</LinearGradient>
				</Defs>
				<Path
					d={`M0 ${HEIGHT / 5} C${WIDTH / 4} ${y1} ${WIDTH / 3} ${y2} ${WIDTH / 2} ${y3}
						S${WIDTH - WIDTH / 4} ${y4} ${WIDTH} ${HEIGHT - HEIGHT / 5}`}
					fill="none"
					stroke="url(#grad)"
				/>
				<Circle cx="53" cy="14" r="12" fill="url(#sunrise)" />
				<Circle cx={WIDTH * 0.91} cy={HEIGHT - HEIGHT / 2.25} r="12" fill="url(#sunset)" />
				<Text fill="black" stroke="purple" fontSize="20" fontWeight="normal" x="110" y="21" textAnchor="middle">
					{sunrise}
				</Text>
				<Text
					fill="black"
					stroke="purple"
					fontSize="20"
					fontWeight="normal"
					x={WIDTH * 0.77}
					y={HEIGHT - HEIGHT / 2.48}
					textAnchor="middle"
				>
					{sunset}
				</Text>
			</Svg>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 50,
		marginBottom: 20,
	},
});

export default Sunrise;
