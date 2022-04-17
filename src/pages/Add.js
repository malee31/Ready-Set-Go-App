import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, View, Text, TextInput } from "react-native";
import { Button, Card, Paragraph, Title, Modal, Portal} from "react-native-paper";
import Screen from "../components/Screen";
import Ionicons from "react-native-vector-icons/Ionicons";

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
		},

	]);


	// 0-6 means sun-sat
	const [daySelect, setDaySelect] = useState(0);

	// Popup
	const [visible, setVisible] = React.useState(true);
	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	return (
		<Screen>
			<View style={{ display: "flex", flexDirection: "row", alignContent: "space-between", marginTop: "4%" }}>
				<Button style={addStyles.weekButtons} mode={daySelect == 0 ? "contained" : "text"} onPress={() => { setDaySelect(0)}}>Sun</Button>
				<Button style={addStyles.weekButtons} mode={daySelect == 1 ? "contained" : "text"} onPress={() => { setDaySelect(1)}}>Mon</Button>
				<Button style={addStyles.weekButtons} mode={daySelect == 2 ? "contained" : "text"} onPress={() => { setDaySelect(2)}}>Tue</Button>
				<Button style={addStyles.weekButtons} mode={daySelect == 3 ? "contained" : "text"} onPress={() => { setDaySelect(3)}}>Wed</Button>
				<Button style={addStyles.weekButtons} mode={daySelect == 4 ? "contained" : "text"} onPress={() => { setDaySelect(4)}}>Thu</Button>
				<Button style={addStyles.weekButtons} mode={daySelect == 5 ? "contained" : "text"} onPress={() => { setDaySelect(5)}}>Fri</Button>
				<Button style={addStyles.weekButtons} mode={daySelect == 6 ? "contained" : "text"} onPress={() => { setDaySelect(6)}}>Sat</Button>
			</View>
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
					<Button icon={"window-close"} onPress={hideModal} contentStyle={{maxWidth: "5%"}}></Button>
					<Text>Add New Task</Text>
					<Text></Text>
				</Modal>
			</Portal>

		</Screen>
	);
};
