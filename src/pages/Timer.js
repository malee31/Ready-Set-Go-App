import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import formatTime from "../utils/formatTime.js"
import Screen from "../components/Screen";
import { colors } from "../../constants.json";
import { vmin } from "../utils/viewport";
import { readSector } from "../utils/storage";
import { useCurrentDate } from "../components/CurrentDateContext";

export default function Timer() {
	const { thisMoment } = useCurrentDate();
	const [entries, setEntries] = useState([]);
	const hasEntries = entries.length !== 0;
	const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
	const currentTask = hasEntries ? entries[currentTaskIndex].task : "No Tasks";
	const [timeLeft, setTimeLeft] = useState(2);
	const [ETA, setETA] = useState(0);
	const absoluteTime = Math.abs(timeLeft);
	const negative = timeLeft < 0;
	let timeString = formatTime(absoluteTime);
	if(negative) {
		timeString = `-${timeString}`;
	}

	useEffect(() => {
		setEntries([]);
		setCurrentTaskIndex(0);
		readSector({ year: thisMoment.year(), month: thisMoment.month() })
			.then(sector => sector.data.filter(entry => {
				return entry.start.day === thisMoment.date();
			}))
			.then(setEntries);
	}, [thisMoment.format("L")]);

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
			fontSize: vmin(23),
			color: (negative ? "red" : "black"),
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

	useEffect(() => {
		const updateTime = () => setTimeLeft((prevState) => (prevState - 1));
		const interval = setInterval(updateTime, 1000);
		updateTime();
		return () => clearInterval(interval);
	}, []);

	return (
		<Screen>
			<Button onPress={() => {
				setCurrentTaskIndex((prevState) => (prevState - 1));
				if(currentTaskIndex < 0) {
					setCurrentTaskIndex(0);
				}
			}}>
				previous
			</Button>
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
