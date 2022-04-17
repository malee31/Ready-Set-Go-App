import { StyleSheet } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import moment from "moment";
import React from "react";

const {cardStyle} = StyleSheet.create({
	cardStyle: {
		marginBottom: 10,
	}
})

export default function TaskCard({ entry }) {
	return (
		<Card style={cardStyle}>
			<Card.Content>
				<Title>{entry.task}</Title>
				<Paragraph>{moment(entry.start).format("hh:mm A")} - {moment(entry.end).format("hh:mm A")}</Paragraph>
			</Card.Content>
		</Card>
	)
}