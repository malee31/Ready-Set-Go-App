import React from "react";
import { StyleSheet, View } from "react-native";

const { screenStyles } = StyleSheet.create({
	screenStyles: {
		paddingHorizontal: "2%",
		paddingVertical: "2%"
	}
});

export default function Screen({ children }) {
	return (
		<View style={screenStyles}>
			{children}
		</View>
	);
};