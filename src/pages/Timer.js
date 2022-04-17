import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import formatTime from "../utils/formatTime.js"
import Screen from "../components/Screen";
import { colors } from "../../constants.json";
import { vmin } from "../utils/viewport";
import { useCurrentDate } from "../components/CurrentDateContext";
import { useDayTasks } from "../components/DayTasksContext";

const timerStyles = StyleSheet.create({
	timer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		flexGrow: 1
	},
	finished: {
		marginTop: "10%"
	},
	finishedContent: {
		padding: 1
	}
});

export default function Timer() {
	const { entries } = useDayTasks();
	const hasEntries = entries.length !== 0;
	const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
	const { thisMoment } = useCurrentDate();
	useEffect(() => {
		if(currentTaskIndex !== 0) {
			setCurrentTaskIndex(0);
		}
	}, [thisMoment.format("L")]);

	const currentTask = hasEntries ? entries[currentTaskIndex].task : "No Tasks";
	const [timeLeft, setTimeLeft] = useState(2);
	const [ETA, setETA] = useState(0);
	const absoluteTime = Math.abs(timeLeft);
	const negative = timeLeft < 0;
	const timeString = `${negative ? "-" : ""}${formatTime(absoluteTime)}`;

	const conditionalTimerStyles = StyleSheet.create({
		curTask: {
			textAlign: "center",
			fontSize: vmin(13)
		},
		time: {
			textAlign: "center",
			fontSize: vmin(23),
			color: (negative ? "red" : "black"),
			borderColor: negative ? "red" : "transparent",
			borderTopWidth: 3,
			borderBottomWidth: 3,
		},
		eta: {
			textAlign: "center",
			fontSize: vmin(8),
			color: colors.darkgray
		},

	});

	useEffect(() => {
		const updateTime = () => setTimeLeft((prevState) => (prevState - 1));
		const interval = setInterval(updateTime, 1000);
		updateTime();
		return () => clearInterval(interval);
	}, []);

	return (
		<Screen>
			<Button onPress={() => {
				if(currentTaskIndex > 0) {
					setCurrentTaskIndex(currentTaskIndex - 1);
				}
			}}>
				Previous
			</Button>
			<View style={timerStyles.timer}>
				<Text
					style={conditionalTimerStyles.curTask}
				>
					{currentTask}
				</Text>

				<Text
					style={conditionalTimerStyles.time}
				>
					{timeString}
				</Text>

				<Text
					style={conditionalTimerStyles.eta}
				>
					ETA: {ETA}
				</Text>
				<Button
					className={"finishedBtn"}
					mode="contained"
					onPress={() => {
						if(currentTaskIndex + 1 < entries.length) {
							setCurrentTaskIndex(currentTaskIndex + 1);
						}
					}}
					style={timerStyles.finished}
					contentStyle={timerStyles.finishedContent}
				>
					Finished
				</Button>
			</View>
			<Button onPress={() => {
				if(currentTaskIndex + 1 < entries.length) {
					setCurrentTaskIndex(currentTaskIndex + 1);
				}
			}}>Next</Button>
		</Screen>
	);
};
