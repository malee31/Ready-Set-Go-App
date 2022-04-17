import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from "react-native";

const { screenStyles } = StyleSheet.create({
	screenStyles: {
		flexDirection: "column",
		alignContent: "center",
		flexShrink: 1,
		flexGrow: 1,
		width: "100%",
		height: "100%",
		paddingHorizontal: "2%",
		paddingVertical: "2%",
		margin: 0,
		padding: 0
	}
});

export default function Screen({ style, children }) {
	return (
		<SafeAreaView style={StyleSheet.compose(screenStyles, style)}>
			{children}
		</SafeAreaView>
	);
};