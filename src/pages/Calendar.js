import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { vmin } from "../utils/viewport";
import { colors } from "../../constants.json";
import Screen from "../components/Screen";

const calendarStyles = StyleSheet.create({
	screenOverrides: {
		paddingVertical: 0,
		paddingHorizontal: 0
	},
	controls: {
		width: "100%",
		height: "10%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		flexWrap: "nowrap",
		borderBottomColor: colors.primary,
		borderBottomWidth: 1
	},
	controlButtons: {
		height: "100%",
		minWidth: "10%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		flexShrink: 1
	},
	controlText: {
		textAlign: "center",
		color: colors.primary,
		fontSize: vmin(4),
		width: "50%",
		flexGrow: 1,
		flexShrink: 1
	},
	listContainer: {
		width: "100%",
		paddingHorizontal: "2%",
		paddingVertical: 5
	},
	listItem: {
		borderRadius: 5,
		borderColor: colors.primary,
		borderWidth: 2,
		width: "100%",
		marginVertical: 1,
	}
});

function CalendarControls() {
	return (
		<View style={calendarStyles.controls}>
			<Button style={calendarStyles.controlButtons}>
				<Ionicons name="caret-back" size={vmin(4)} color={colors.primary}/>
			</Button>
			<Text style={calendarStyles.controlText}>Today</Text>
			<Button style={calendarStyles.controlButtons}>
				<Ionicons name="caret-forward" size={vmin(4)} color={colors.primary}/>
			</Button>
		</View>
	);
}

function CalendarList() {
	return (
		<ScrollView style={calendarStyles.listContainer}>
			<FlatList
				data={[0, 0, 0]}
				renderItem={
					() => {
						return <View style={calendarStyles.listItem}>Yes</View>
					}
				}
			/>
		</ScrollView>
	);
}

export default function Calendar({ navigation }) {
	return (
		<Screen style={calendarStyles.screenOverrides}>
			<CalendarControls/>
			<CalendarList/>
		</Screen>
	);
};