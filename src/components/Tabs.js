import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import Calendar from "../pages/Calendar";
import Stopwatch from "../pages/Stopwatch";
import Add from "../pages/Add";
import Timer from "../pages/Timer"

const ICON_SIZE = 20;

const Tab = createMaterialBottomTabNavigator();

export function TabNavigator() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen
					name="Calendar"
					component={Calendar}
					options={{
						tabBarIcon: props => (<Ionicons name="calendar" size={ICON_SIZE} {...props}/>)
					}}
				/>
				<Tab.Screen
					name="Home"
					component={Timer}
					options={{
						tabBarIcon: props => (<Ionicons name="alarm" size={ICON_SIZE} {...props}/>)
					}}
				/>
				<Tab.Screen
					name="Add"
					component={Add}
					options={{
						tabBarIcon: props => (<Ionicons name="add" size={ICON_SIZE} {...props}/>)
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}