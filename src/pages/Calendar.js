import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { colors } from "../../constants.json";
import Screen from "../components/Screen";
import DayControls from "../components/DayControls";
import TaskCard from "../components/TaskCard";
import { useDayTasks } from "../components/DayTasksContext";
import moment from "moment";

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
	const { entries } = useDayTasks();

	return (
		<ScrollView contentContainerStyle={calendarStyles.listContainer}>
			{entries.map(entry => {
				const diffSeconds = moment.duration(moment(entry.end).diff(moment(entry.start))).asSeconds();
				const diffNowSeconds = moment.duration(moment(entry.end).diff(moment())).asSeconds();
				const percent = diffNowSeconds < 0 ? 100 : diffNowSeconds <= diffSeconds ? (diffSeconds - diffNowSeconds) / diffSeconds * 100 : 0;
				console.log(`Percent: ${diffNowSeconds}`);
				return (<TaskCard entry={entry} percent={percent} key={entry.id}/>);
			})}
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