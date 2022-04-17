import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { vmin } from "../utils/viewport";
import { colors } from "../../constants.json";
import React from "react";
import { useCurrentDate } from "./CurrentDateContext";

const controlStyles = StyleSheet.create({
	controls: {
		width: "100%",
		height: "10%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		flexWrap: "nowrap",
		borderBottomColor: colors.primary,
		borderBottomWidth: 1
	},
	controlButtons: {
		height: "100%",
		minWidth: "10%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		flexShrink: 1
	},
	controlText: {
		textAlign: "center",
		color: colors.primary,
		fontSize: vmin(4),
		width: "50%",
		flexGrow: 1,
		flexShrink: 1
	}
});

export default function DayControls() {
	const { thisMoment, setMoment } = useCurrentDate();
	const offsetMoment = offset => setMoment(thisMoment.add({ days: offset }));

	return (
		<View style={controlStyles.controls}>
			<Button style={controlStyles.controlButtons} onPress={() => offsetMoment(-1)}>
				<Ionicons name="caret-back" size={vmin(4)} color={colors.primary}/>
			</Button>
			<Text style={controlStyles.controlText}>{thisMoment.format("ddd MMMM DD")}</Text>
			<Button style={controlStyles.controlButtons} onPress={() => offsetMoment(1)}>
				<Ionicons name="caret-forward" size={vmin(4)} color={colors.primary}/>
			</Button>
		</View>
	);
}