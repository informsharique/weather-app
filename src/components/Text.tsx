import React from 'react';
import { Text, TextProps } from 'react-native';

const ScaledText: React.FC<TextProps> = ({ children, ...props }) => {
	return (
		<Text maxFontSizeMultiplier={1} numberOfLines={2} {...props}>
			{children}
		</Text>
	);
};

export { ScaledText as Text };
