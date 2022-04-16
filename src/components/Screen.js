import React from "react";
import { StyleSheet, View } from "react-native";

const { screenStyles } = StyleSheet.create({
	screenStyles: {
		flexDirection: "column",
		alignContent: "center",
		flexGrow: 1,
		width: "100%",
		paddingHorizontal: "2%",
		paddingVertical: "2%",
		margin: 0,
		padding: 0
	}
});

export default function Screen({ children }) {
	return (
		<View style={screenStyles}>
			{children}
		</View>
	);
};