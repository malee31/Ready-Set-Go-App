import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Text } from 'react-native-paper';
import { colors } from "./constants.json";

const theme = {
	...DefaultTheme,
	dark: false,
	roundness: 2,
	colors: {
		...DefaultTheme.colors,
		primary: colors.primary,
		accent: colors.secondary,
		background: colors.background,
		text: colors.text
	}
};

export default function App() {
	return (
		<PaperProvider theme={theme}>
			<View style={styles.container}>
				<Text>Open up App.js to start working on your app!</Text>
				<StatusBar style="auto"/>
			</View>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
