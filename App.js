import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { TabNavigator } from "./src/components/Tabs";
import { colors } from "./constants.json";
import { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import { basicInfo } from "./src/utils/storage";
import CurrentDateProvider from "./src/components/CurrentDateContext";

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
	const [ready, setReady] = useState(false);
	useEffect(() => {
		basicInfo()
			.then(() => {
				setReady(true);
			});
	}, []);

	if(!ready) return (<AppLoading/>);

	return (
		<PaperProvider theme={theme}>
			<CurrentDateProvider>
				<StatusBar style="auto"/>
				<TabNavigator/>
			</CurrentDateProvider>
		</PaperProvider>
	);
}