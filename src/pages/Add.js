import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Button, Modal, Portal, Switch } from "react-native-paper";
import Screen from "../components/Screen";
import DayControls from "../components/DayControls";
import { addEntry, momentSectorRead } from "../utils/storage";
import { useCurrentDate } from "../components/CurrentDateContext";
import moment from "moment";
import { toMomentStart } from "../utils/formatTime";
import TaskCard from "../components/TaskCard";
import AddTaskEntry from "../components/AddTaskEntry";
import { useDayTasks } from "../components/DayTasksContext";

const addStyles = StyleSheet.create({
	screenOverrides: {
		paddingVertical: 0,
		paddingHorizontal: 0
	},
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
		paddingHorizontal: "2%",
		paddingVertical: 5,
		flexShrink: 1,
		flexGrow: 1
	},
	inputStyle: {
		fontSize: 20
	}
});

export default function Add() {
	const { thisMoment } = useCurrentDate();
	const {entries, reload} = useDayTasks();
	const [currentTask, setCurrentTask] = useState({
		task: "",
		startTime: "",
		endTime: "",
		isGetReady: false
	});

	// Popup
	const [visible, setVisible] = React.useState(true);
	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	const save = () => {
		const startMoment = moment(currentTask.startTime, "hh:mm A").year(thisMoment.year()).month(thisMoment.month()).date(thisMoment.date());
		const endMoment = moment(currentTask.endTime, "hh:mm A").year(thisMoment.year()).month(thisMoment.month()).date(thisMoment.date());
		const newEntry = {
			task: currentTask.task,
			start: toMomentStart(startMoment),
			end: toMomentStart(endMoment)
		};

		return addEntry(newEntry)
			.then(() => {
				setCurrentTask({
					task: "",
					startTime: "",
					endTime: ""
				});
				reload();
			});
	}

	return (
		<Screen style={addStyles.screenOverrides}>
			<DayControls/>
			<FlatList
				style={addStyles.listContainer}
				data={entries}
				keyExtractor={(data, index) => index}
				renderItem={({ item }) => <TaskCard entry={item}/>}
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

					<AddTaskEntry caption="Task" placeholderText="Enter Task" attribute="task" state={currentTask} setState={setCurrentTask}/>
					<AddTaskEntry caption="Start Time" placeholderText="Enter Start Time" attribute="startTime" state={currentTask} setState={setCurrentTask}/>
					<AddTaskEntry caption="End Time" placeholderText="Enter End Time" attribute="endTime" state={currentTask} setState={setCurrentTask}/>

					<Text style={{ fontSize: 20, marginTop: 20 }}>Is Part of Getting Ready?</Text>
					<Switch
						style={{ marginTop: 5 }}
						value={currentTask.isGetReady}
						onValueChange={() => {
							setCurrentTask({ ...currentTask, isGetReady: !currentTask.isGetReady })
						}}
					/>
					<Button onPress={() => save().then(hideModal).catch(console.error)}>
						Submit
					</Button>
				</Modal>
			</Portal>

		</Screen>
	);
};