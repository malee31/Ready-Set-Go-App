import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { TabNavigator } from "./src/components/Tabs";
import { colors } from "./constants.json";
import { useEffect, useState } from "react";
import { instantiate, lister } from "./src/utils/storage";
import AppLoading from "expo-app-loading";

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
		instantiate()
			.then(() => {
				setReady(true);
			});
	}, []);

	useEffect(() => {
		if(ready) {
			lister().then(console.log);
		}
	}, [ready]);

	if(!ready) return (<AppLoading/>);

	return (
		<PaperProvider theme={theme}>
			<StatusBar style="auto"/>
			<TabNavigator/>
		</PaperProvider>
	);
}