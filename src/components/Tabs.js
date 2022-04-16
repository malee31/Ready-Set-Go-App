import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Mock from "../pages/MockPage";

const Tab = createMaterialBottomTabNavigator();

export function TabNavigator() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name="Home" component={Mock("Home")}/>
				<Tab.Screen name="Settings" component={Mock("Settings")}/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}