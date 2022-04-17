import { Dimensions } from "react-native";
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

function resync() {
	width = Dimensions.get('window').width;
	height = Dimensions.get('window').height;
}

export function vw(val) {
	resync();
	return val * (width / 100);
}

export function vh(val) {
	resync();
	return val * (height / 100);
}

export function vmin(val) {
	return Math.min(vw(val), vh(val));
}

export function vmax(val) {
	return Math.max(vw(val), vh(val));
}