import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { colors } from "../../constants.json";
import { clear } from "react-native/Libraries/LogBox/Data/LogBoxData";

const taskCardStyles = StyleSheet.create({
	overlayContainer: {
		position: "relative",
		width: "100%",
		marginBottom: 10
	},
	subunderlay: {
		width: "100%",
		height: "100%",
		position: "absolute",
		backgroundColor: colors.lightgray,
		borderWidth: 1,
		borderColor: colors.darkgray,
	},
	underlay: {
		backgroundColor: colors.light,
		borderColor: "transparent"
	},
	card: {
		width: "100%",
		backgroundColor: "transparent"
	}
});

export default function TaskCard({ entry }) {
	const diffSeconds = moment.duration(moment(entry.end).diff(moment(entry.start))).asSeconds();
	const calculatePercent = () => {
		const diffNowSeconds = moment.duration(moment(entry.end).diff(moment())).asSeconds();
		return diffNowSeconds < 0 ? 100 : diffNowSeconds <= diffSeconds ? (diffSeconds - diffNowSeconds) / diffSeconds * 100 : 0
	};
	const [percent, setPercent] = useState(calculatePercent());

	useEffect(() => {
		// Updates every 0.1%
		const interval = setInterval(() => setPercent(calculatePercent()), diffSeconds);
		return () => clearInterval(interval);
	}, []);

	return (
		<View style={taskCardStyles.overlayContainer}>
			<View style={taskCardStyles.subunderlay}/>
			<View style={StyleSheet.flatten([taskCardStyles.subunderlay, taskCardStyles.underlay, { width: `${percent}%` }])}/>
			<Card style={taskCardStyles.card}>
				<Card.Content>
					<Title>{entry.task}</Title>
					<Paragraph>{moment(entry.start).format("L hh:mm A")} - {moment(entry.end).format("hh:mm A")}</Paragraph>
				</Card.Content>
			</Card>
		</View>

	)
}