import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { colors } from "../../constants.json";
import Screen from "../components/Screen";
import DayControls from "../components/DayControls";
import { useCurrentDate } from "../components/CurrentDateContext";

const calendarStyles = StyleSheet.create({
	screenOverrides: {
		paddingVertical: 0,
		paddingHorizontal: 0
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

function CalendarList() {
	const { thisMoment } = useCurrentDate();
	const [entries, setEntries] = useState([]);

	return (
		<ScrollView style={calendarStyles.listContainer}>
			<FlatList
				data={entries}
				keyExtractor={entry => entry.id}
				renderItem={() => {
					return <View style={calendarStyles.listItem}><Text>Yes</Text></View>
				}}
			/>
		</ScrollView>
	);
}

export default function Calendar() {
	return (
		<Screen style={calendarStyles.screenOverrides}>
			<DayControls/>
			<CalendarList/>
		</Screen>
	);
};