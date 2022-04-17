import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { Button, Card, Modal, Paragraph, Portal, Title } from "react-native-paper";
import Screen from "../components/Screen";
import DayControls from "../components/DayControls";
import { addEntry, momentSectorRead } from "../utils/storage";
import { useCurrentDate } from "../components/CurrentDateContext";
import moment from "moment";

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

function toMomentStart(momentInstance) {
	return {
		year: momentInstance.year(),
		month: momentInstance.month(),
		day: momentInstance.date(),
		hour: momentInstance.hour(),
		minute: momentInstance.minute()
	};
}

export default function Add({ navigation }) {
	const [tasks, setTasks] = useState([]);
	const { thisMoment } = useCurrentDate();
	useEffect(() => {
		// Force add 20 entries for testing
		let promise = Promise.resolve();
		// Array(20).fill(0).map(() => {
		// 	promise = promise.then(() => {
		// 		return addEntry({
		// 			task: "Get Good",
		// 			start: {
		// 				year: thisMoment.year(),
		// 				month: thisMoment.month(),
		// 				day: thisMoment.date(),
		// 				hour: 10
		// 			},
		// 			end: {
		// 				year: thisMoment.year(),
		// 				month: thisMoment.month(),
		// 				day: thisMoment.date(),
		// 				hour: 11
		// 			}
		// 		});
		// 	});
		// });

		promise.then(() => {
			momentSectorRead(thisMoment).then(sector => {
				setTasks(sector.data);
			});
		});
		// Force add end
	}, []);

	// Popup
	const [visible, setVisible] = React.useState(true);
	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	const [currentTask, setCurrentTask] = useState({
		task: "",
		startTime: "",
		endTime: ""
	});

	const save = () => {
		const startMoment = moment(currentTask.startTime, "hh:mm A").year(thisMoment.year()).month(thisMoment.month()).day(thisMoment.date());
		const endMoment = moment(currentTask.endTime, "hh:mm A").year(thisMoment.year()).month(thisMoment.month()).day(thisMoment.date());
		console.log("ADDING");
		const newEntry = {
			task: currentTask.task,
			start: toMomentStart(startMoment),
			end: toMomentStart(endMoment)
		};
		return addEntry(newEntry).then(() => {
			setCurrentTask({
				task: "",
				startTime: "",
				endTime: ""
			});
			setTasks([...tasks, newEntry]);
		});
	}

	console.log(tasks)

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
							<Paragraph>{moment(item.start).format("hh:mm A")} - {moment(item.end).format("hh:mm A")}</Paragraph>
						</Card.Content>
					</Card>
				)}
			/>
			<Button icon={"plus"} onPress={showModal}>Add New Task</Button>

			<Portal>
				<Modal visible={visible} onDismiss={hideModal}
					contentContainerStyle={{
						backgroundColor: 'white',
						padding: 30,
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
					<Text style={{ fontSize: 30, marginTop: 20 }}>Add New Task</Text>
					<Text style={{ fontSize: 20, marginTop: 20 }}>Task</Text>
					<TextInput
						style={inputStyle}
						onChangeText={e => setCurrentTask({ ...currentTask, task: e })}
						value={currentTask.task}
						placeholder="Enter Task"
					/>
					<Text style={{ fontSize: 20, marginTop: 20 }}>Start Time</Text>
					<TextInput
						style={inputStyle}
						onChangeText={e => setCurrentTask({ ...currentTask, startTime: e })}
						value={currentTask.startTime}
						placeholder="Enter Start Time"
					/>
					<Text style={{ fontSize: 20, marginTop: 20 }}>End Time</Text>
					<TextInput
						style={inputStyle}
						onChangeText={e => setCurrentTask({ ...currentTask, endTime: e })}
						value={currentTask.endTime}
						placeholder="Enter End Time"
					/>
					<Button onPress={() => {
						save().then(hideModal)
					}}>
						Submit
					</Button>
				</Modal>
			</Portal>

		</Screen>
	);
};