import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, View, Text, TextInput } from "react-native";
import { Button, Card, Paragraph, Title, Modal, Portal} from "react-native-paper";
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

const inputStyle = {
	fontSize: 20
}

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
		

	]);


	// 0-6 means sun-sat
	const [daySelect, setDaySelect] = useState(0);

	// Popup
	const [visible, setVisible] = React.useState(true);
	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	const [currentTask, setCurrentTask] = useState({
		task: "",
		startTime: "",
		endTime: ""
	});

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
				/><Button icon={"plus"} onPress={showModal} >Add New Task</Button>
				
			
			<Portal>
				<Modal visible={visible} onDismiss={hideModal} 
					contentContainerStyle={{
						backgroundColor: 'white', 
						padding: 30, 
						height: "90%"
					}}
				>
					<View style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "flex-end"
							}}>
						<Button 
							icon={"window-close"} 
							onPress={hideModal}
							
						></Button>
					</View>
					<Text style={{fontSize: 30, marginTop: 20}}>Add New Task</Text>
					<Text style={{fontSize: 20, marginTop: 20}}>Task</Text>
					<TextInput 
						style={inputStyle}
						onChangeText={setCurrentTask}
						value={currentTask.task}
						placeholder="Enter Task"
					/>
					<Text style={{fontSize: 20, marginTop: 20}}>Start Time</Text>
					<TextInput  
						style={inputStyle}
						onChangeText={setCurrentTask}
						value={currentTask.startTime}
						placeholder="Enter Start Time"
					/>
					<Text style={{fontSize: 20, marginTop: 20}}>End Time</Text>
					<TextInput  
						style={inputStyle}
						onChangeText={setCurrentTask}
						value={currentTask.endTime}
						placeholder="Enter End Time"
					/>
					<Button onPress={setTasks(...tasks, currentTask)}>Submit</Button>
				</Modal>
			</Portal>

		</Screen>
	);
};