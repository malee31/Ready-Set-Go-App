import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, View, Text, TextInput } from "react-native";
import { Button, Card, Paragraph, Title, Modal, Portal} from "react-native-paper";
import Screen from "../components/Screen";
import Ionicons from "react-native-vector-icons/Ionicons";
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

	// Popup
	const [visible, setVisible] = React.useState(true);
	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	return (
		<Screen>
			<DayControls/>
				<FlatList 
					style={addStyles.listContainer}
					data={tasks}
					keyExtractor={(data, index) => index}
					renderItem={({ item }) => (
						<Card style={addStyles.card} onPress={showModal}>
							<Card.Content>
								<Title>{item.task}</Title>
								<Paragraph>{item.startTime} - {item.endTime}</Paragraph>
							</Card.Content>
						</Card>
					)}
				/>

			
			<Portal>
				<Modal visible={visible} onDismiss={hideModal} 
					contentContainerStyle={{
						backgroundColor: 'white', 
						padding: 30, 
						height: "90%",
				}}>
					<Button icon={"window-close"} onPress={hideModal} contentStyle={{}}></Button>
					<Text>Add New Task</Text>
					<Text></Text>
				</Modal>
			</Portal>

		</Screen>
	);
};
