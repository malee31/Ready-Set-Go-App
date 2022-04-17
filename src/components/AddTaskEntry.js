import React from 'react'
import { StyleSheet, View, TextInput } from "react-native";
import { Text } from "react-native-paper";

const { entryStyle, inputStyle } = StyleSheet.create({
	entryStyle: {
		fontSize: 20,
		marginTop: 20
	},
	inputStyle: {
		fontSize: 20
	}
});

export default function AddTaskEntry({ caption, placeholderText, attribute, state, setState }) {
	const setAttribute = val => {
		const copy = { ...state };
		copy[attribute] = val;
		setState(copy);
	}

	return (
		<View>
			<Text style={entryStyle}>{caption}</Text>
			<TextInput
				style={inputStyle}
				onChangeText={setAttribute}
				value={state[attribute]}
				placeholder={placeholderText}
			/>
		</View>
	)
}