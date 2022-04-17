import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { colors } from "../../constants.json";
import Screen from "../components/Screen";
import DayControls from "../components/DayControls";
import { useCurrentDate } from "../components/CurrentDateContext";
import moment from "moment";
import { readSector } from "../utils/storage";

const calendarStyles = StyleSheet.create({
	screenOverrides: {
		paddingVertical: 0,
		paddingHorizontal: 0
	},
	listContainer: {
		width: "100%",
		paddingHorizontal: "2%",
		paddingVertical: 5,
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
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
	const year = thisMoment.year();
	const month = thisMoment.month();
	const day = thisMoment.date();

	useEffect(() => {
		setEntries([]);
		readSector({year, month})
			.then(sector => sector.data.filter(entry => entry.start.day === day))
			.then(setEntries);
	}, [year, month, day]);

	return (
		<ScrollView contentContainerStyle={calendarStyles.listContainer}>
			{entries.map(entry => (
				<View style={calendarStyles.listItem} key={entry.id}>
					<Text>{entry.task}</Text>
					<Text>{moment(entry.start).format("hh:mm A")} - {moment(entry.end).format("hh:mm A")}</Text>
				</View>
			))}
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