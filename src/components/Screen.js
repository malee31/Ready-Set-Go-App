import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

const { screenStyles } = StyleSheet.create({
	screenStyles: {
		flexDirection: "column",
		alignContent: "center",
		flexShrink: 1,
		flexGrow: 1,
		width: "100%",
		paddingHorizontal: "2%",
		paddingVertical: "2%",
		margin: 0,
		padding: 0
	}
});

export default function Screen({ style, children }) {
	return (
		<SafeAreaView>
			<View style={StyleSheet.compose(screenStyles, style)}>
				{children}
			</View>
		</SafeAreaView>
	);
};