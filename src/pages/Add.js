import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import Screen from "../components/Screen";

export default function Add({ navigation }) {
	// const [tasks, setTasks] = {[
	// 	{
	// 		task: "Get Dressed",
	// 		startTime: "",
	// 		endTime: ""
	// 	},
	// 	{
	// 		task: "Get Dressed",
	// 		startTime: "",
	// 		endTime: ""
	// 	},

	// ]};

	return (
		<Screen>
			<View style={{ display: "flex", flexDirection: "column", alignContent: "space-around"}}>
				<View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
					<Button style={{ display: "inline-block" }}>Sun</Button>
					<Button style={{ display: "inline-block" }}>Mon</Button>
					<Button style={{ display: "inline-block" }}>Tue</Button>
					<Button style={{ display: "inline-block" }}>Wed</Button>
					<Button style={{ display: "inline-block" }}>Thu</Button>
					<Button style={{ display: "inline-block" }}>Fri</Button>
					<Button style={{ display: "inline-block" }}>Sat</Button>
				</View>
			</View>
			{/* <View></View> */}
		</Screen>
	);
};
