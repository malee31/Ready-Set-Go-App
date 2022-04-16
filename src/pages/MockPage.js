import React from "react";
import Screen from "../components/Screen";
import { Text } from "react-native";

export default function MockPage(content) {
	return () => (
		<Screen>
			<Text>
				{content}
			</Text>
		</Screen>
	);
};