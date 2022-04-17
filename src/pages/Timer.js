import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import formatTime from "../utils/formatTime.js"

export default function Timer(props) {
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
	}, [])
	
	
	return (
		<View style={{ flex: 1}}>
		<Button>previous</Button>
			<View style={{ margin: "auto" }}>
				<Text 
					className={"curTask"}
					style={{fontSize: "13vw", margin: "auto" }}
				>
					{currentTask}
				</Text>

				<Text 
					className={"time"}
					style={{fontSize: "23vw", margin: "auto" }}
				>
					{formatTime(timeLeft)}
				</Text>

				<Text
					className={"ETA"}
					style={{ fontSize: "8vw", margin: "auto", color: "gray" }}
				>
					ETA: {ETA}
				</Text>

				<Button 
					className={"finishedBtn"}  
					mode="contained" 
					onPress={() => {
						console.log('Pressed')
					}} 
					style={{ marginTop: "10%"}} 
					contentStyle = {{ padding: "5px"}}
				>
					Finished
				</Button>
				
			</View>
		<Button>next</Button>
		</View>
	);
};
