import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import Calendar from "../pages/Calendar";
import Add from "../pages/Add";
import Timer from "../pages/Timer"
import { colors } from "../../constants.json";

const ICON_SIZE = 20;

const Tab = createMaterialBottomTabNavigator();

export function TabNavigator() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Home"
				backBehavior="order"
				shifting={true}
				inactiveColor={colors.darkgray}
				activeColor={colors.primary}
				barStyle={{
					borderTopWidth: 1,
					borderTopColor: colors.gray
				}}
				screenOptions={{
					tabBarColor: colors.lightgray
				}}
			>
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