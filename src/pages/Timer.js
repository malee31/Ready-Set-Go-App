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

	const [ETA, setETA] = useState(0);
	const [timeLeft, setTimeLeft] = useState(240);
	const [currentTask, setCurrentTask] = useState("Current Task")

	useEffect(() => {
		const getTime = () => {
			const updateTime = () => {
				setTimeLeft((prevState) => (prevState - 1))
			}
			var interval = setInterval(updateTime, 1000);
		}
		getTime();
	}, []);


	return (
		<Screen>
			<Button>previous</Button>
			<View>
				<Text
					adjustsFontSizeToFit={true}
					style={timerStyles.curTask}
				>
					{currentTask}
				</Text>

				<Text
					adjustsFontSizeToFit={true}
					style={timerStyles.time}
				>
					{formatTime(timeLeft)}
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
			<Button>next</Button>
		</Screen>
	);
};
