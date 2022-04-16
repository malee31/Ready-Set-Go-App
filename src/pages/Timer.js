import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export default function Timer(props) {
	return (
		<View>
            <Text className={"curTask"}>Current Task</Text>
            <Text>00:00</Text>
            <Button>Finished</Button>
		</View>
	);
};

const timerStyle = {
    
}