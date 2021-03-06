import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { colors } from "../../constants.json";
import Screen from "../components/Screen";
import DayControls from "../components/DayControls";
import TaskCard from "../components/TaskCard";
import { useDayTasks } from "../components/DayTasksContext";

const calendarStyles = StyleSheet.create({
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
	const { entries } = useDayTasks();

	return (
		<ScrollView contentContainerStyle={calendarStyles.listContainer}>
			{entries.map(entry => <TaskCard entry={entry} key={entry.id}/>)}
		</ScrollView>
	);
}

export default function Calendar() {
	return (
		<Screen>
			<DayControls/>
			<CalendarList/>
		</Screen>
	);
};