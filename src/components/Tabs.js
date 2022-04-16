import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import Mock from "../pages/MockPage";

const ICON_SIZE = 20;

const Tab = createMaterialBottomTabNavigator();

export function TabNavigator() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen
					name="Home"
					component={Mock("Home")}
					options={{
						tabBarIcon: props => (<Ionicons name="home" size={ICON_SIZE} {...props}/>)
					}}
				/>
				<Tab.Screen
					name="Settings"
					component={Mock("Settings")}
					options={{
						tabBarIcon: props => (<Ionicons name="settings" size={ICON_SIZE} {...props}/>)
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}