import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import Screen from "../components/Screen";
import DayControls from "../components/DayControls";

const addStyles = StyleSheet.create({
	weekLabels: {
		display: "flex",
		flexDirection: "row",
		alignContent: "space-between",
		flexWrap: "nowrap",
		marginVertical: "4%",
		width: "100%"
	},
	weekButtons: {
		width: "14%",
		flexShrink: 1,
		flexGrow: 1
	},
	listContainer: {
		flexShrink: 1,
		flexGrow: 1
	},
	card: {
		marginBottom: 10,
	}
});

export default function Add({ navigation }) {
	const [tasks, setTasks] = useState([
		{
			task: "Get Dressed",
			startTime: "10:00 AM",
			endTime: "11:00 AM"
		},
		{
			task: "Get Dressed",
			startTime: "10:00 AM",
			endTime: "11:00 AM"
		},
		{
			task: "Get Dressed",
			startTime: "10:00 AM",
			endTime: "11:00 AM"
		},
		{
			task: "Get Dressed",
			startTime: "10:00 AM",
			endTime: "11:00 AM"
		},
		{
			task: "Get Dressed",
			startTime: "10:00 AM",
			endTime: "11:00 AM"
		},
		{
			task: "Get Dressed",
			startTime: "10:00 AM",
			endTime: "11:00 AM"
		},
		{
			task: "Get Dressed",
			startTime: "10:00 AM",
			endTime: "11:00 AM"
		},
		{
			task: "Get Dressed",
			startTime: "10:00 AM",
			endTime: "11:00 AM"
		},
		{
			task: "Get Dressed",
			startTime: "10:00 AM",
			endTime: "11:00 AM"
		},
		{
			task: "Get Dressed",
			startTime: "10:00 AM",
			endTime: "11:00 AM"
		},
		{
			task: "Get Dressed",
			startTime: "10:00 AM",
			endTime: "11:00 AM"
		},
		{
			task: "Get Dressed",
			startTime: "10:00 AM",
			endTime: "11:00 AM"
		},
		{
			task: "Get Dressed",
			startTime: "10:00 AM",
			endTime: "11:00 AM"
		},
		{
			task: "Get Dressed",
			startTime: "10:00 AM",
			endTime: "11:00 AM"
		}
	]);


	// 0-6 means sun-sat
	const [daySelect, setDaySelect] = useState(0);

	return (
		<Screen>
			<DayControls/>
			<FlatList
				style={addStyles.listContainer}
				data={tasks}
				keyExtractor={(data, index) => index}
				renderItem={({ item }) => (
					<Card style={addStyles.card}>
						<Card.Content>
							<Title>{item.task}</Title>
							<Paragraph>{item.startTime} - {item.endTime}</Paragraph>
						</Card.Content>
					</Card>
				)}
			/>
		</Screen>
	);
};
