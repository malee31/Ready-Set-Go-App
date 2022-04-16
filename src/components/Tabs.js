import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Mock from "../pages/MockPage";
import Timer from "../pages/Timer"

const Tab = createMaterialBottomTabNavigator();

export function TabNavigator() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name="Home" component={Mock("Home")}/>
				<Tab.Screen name="Settings" component={Mock("Settings")}/>
				<Tab.Screen name="Timer" component={Timer}/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}