import { Platform } from "react-native";
import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = "RSGDB.sqlite";
const db = openDatabase();

function openDatabase() {
	if(Platform.OS === "web") {
		return {
			transaction: () => {
				return {
					executeSql: () => {},
				};
			}
		};
	}

	return SQLite.openDatabase(DATABASE_NAME);
}

let instantiated = false;

export function instantiate() {
	return instantiated || (instantiated = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY NOT NULL, title TEXT, description TEXT, start INT, end INT);",
				[],
				resolve,
				reject
			);
		});
	}));
}

export function lister() {
	console.log("LIST");
	return new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				"SELECT name FROM sqlite_schema WHERE type='table' ORDER BY name;",
				[],
				resolve,
				resolve
			);
		});
	});
}