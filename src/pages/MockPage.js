import React from "react";
import { View } from "react-native";

export default function MockPage(content) {
	return () => (
		<View>
			{content}
		</View>
	);
};