import moment from "moment";

export default function formatTime(secs) {
	if(secs >= 24 * 60 * 60) {
		console.log("Time should not be 24 hours or more!");
	}
	return moment.utc(moment.unix(secs).diff(moment.unix(0))).format("HH:mm:ss");
}

export function toMomentStart(momentInstance) {
	return {
		year: momentInstance.year(),
		month: momentInstance.month(),
		day: momentInstance.date(),
		hour: momentInstance.hour(),
		minute: momentInstance.minute()
	};
}