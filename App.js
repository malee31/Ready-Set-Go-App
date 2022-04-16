import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { TabNavigator } from "./src/components/Tabs";
import { colors } from "./constants.json";

const theme = {
	...DefaultTheme, dark: false, roundness: 2, colors: {
		...DefaultTheme.colors,
		primary: colors.primary,
		accent: colors.secondary,
		background: colors.background,
		text: colors.text
	}
};

export default function App() {
	return (<PaperProvider theme={theme}>
			<StatusBar style="auto"/>
			<TabNavigator/>
		</PaperProvider>);
}
