import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export default function Timer(props) {
    const [ETA, setETA] = useState();

	return (
		<View>
            <Text className={"curTask"}>Current Task</Text>
            <Text className={"time"}>00:00</Text>
            <Text>ETA: {ETA}</Text>
            <Button className={"finishedBtn"}>Finished</Button>
		</View>
	);
};

const timerStyle = {
    
}