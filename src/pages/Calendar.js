import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { colors } from "../../constants.json";
import Screen from "../components/Screen";
import DayControls from "../components/DayControls";
import { useCurrentDate } from "../components/CurrentDateContext";
import { readSector } from "../utils/storage";
import TaskCard from "../components/TaskCard";

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
				<TaskCard entry={entry} key={entry.id}/>
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