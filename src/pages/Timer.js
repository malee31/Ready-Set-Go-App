import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import formatTime from "../utils/formatTime.js"
import Screen from "../components/Screen";
import { colors } from "../../constants.json";
import { vmin } from "../utils/viewport";

export default function Timer() {
	const timerStyles = StyleSheet.create({
		curTask: {
			textAlign: "center",
			fontSize: vmin(13)
		},
		timer: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			flexGrow: 1
		},
		time: {
			textAlign: "center",
			fontSize: vmin(23)
		},
		eta: {
			textAlign: "center",
			fontSize: vmin(8),
			color: colors.darkgray
		},
		finished: {
			marginTop: "10%"
		},
		finishedContent: {
			padding: 1
		}
	});

	const [currentTask, setCurrentTask] = useState("Current Task");
	const [timeLeft, setTimeLeft] = useState(240);
	const [ETA, setETA] = useState(0);
	const absoluteTime = Math.abs(timeLeft);
	const negative = timeLeft < 0;
	let timeString = formatTime(absoluteTime);
	if(negative) {
		timeString = `-${timeString}`;
	}

	useEffect(() => {
		const updateTime = () => setTimeLeft((prevState) => (prevState - 1));
		const interval = setInterval(updateTime, 1000);
		updateTime();
		return () => clearInterval(interval);
	}, []);

	return (
		<Screen>
			<Button>previous</Button>
			<View style={timerStyles.timer}>
				<Text
					style={timerStyles.curTask}
				>
					{currentTask}
				</Text>

				<Text
					style={timerStyles.time}
				>
					{timeString}
				</Text>

				<Text
					style={timerStyles.eta}
				>
					ETA: {ETA}
				</Text>
				<Button
					className={"finishedBtn"}
					mode="contained"
					onPress={() => {
						console.log('Pressed')
					}}
					style={timerStyles.finished}
					contentStyle={timerStyles.finishedContent}
				>
					Finished
				</Button>
			</View>
			<Button>Next</Button>
		</Screen>
	);
};
