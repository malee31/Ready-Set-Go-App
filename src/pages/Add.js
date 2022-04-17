import React, { useState } from "react";
import { Text, View, FlatList, ScrollView } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import Screen from "../components/Screen";

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

	return (
		<Screen>
			<View style={{ display: "flex", flexDirection: "column", alignContent: "space-around", marginTop: "4%"}}>
				<View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
					<Button mode={daySelect==0?"contained":"text"} onPress={ () => { setDaySelect(0)}}>Sun</Button>
					<Button mode={daySelect==1?"contained":"text"} onPress={ () => { setDaySelect(1)}}>Mon</Button>
					<Button mode={daySelect==2?"contained":"text"} onPress={ () => { setDaySelect(2)}}>Tue</Button>
					<Button mode={daySelect==3?"contained":"text"} onPress={ () => { setDaySelect(3)}}>Wed</Button>
					<Button mode={daySelect==4?"contained":"text"} onPress={ () => { setDaySelect(4)}}>Thu</Button>
					<Button mode={daySelect==5?"contained":"text"} onPress={ () => { setDaySelect(5)}}>Fri</Button>
					<Button mode={daySelect==6?"contained":"text"} onPress={ () => { setDaySelect(6)}}>Sat</Button>
				</View>
			</View>
			<View style={{paddingTop: 10}}>
			<ScrollView style={{ flex : 1, flexGrow: 1}}>
				<FlatList
					
					data={tasks}
					// keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<Card style={{marginTop: 10}}>
							<Card.Content>
								<Title>{item.task}</Title>
								<Paragraph>{item.startTime} - {item.endTime}</Paragraph>
							</Card.Content>
						</Card>
					)}
				/>
			</ScrollView>
			
			</View>
		</Screen>
	);
};
