import React, { createContext, useContext, useState } from "react";
import moment from "moment";

function now(momentInstance) {
	// console.log(momentInstance.toString())
	return {
		year: momentInstance.year(),
		month: momentInstance.month(),
		day: momentInstance.date()
	};
}

const currentDateContext = createContext(now(moment()));

export default function CurrentDateProvider({children}) {
	const [currentDate, setCurrentDate] = useState(now(moment()));
	const currentDateValue = {
		set: momentInstance => setCurrentDate(now(momentInstance)),
		data: currentDate
	};

	return(
		<currentDateContext.Provider value={currentDateValue}>
			{children}
		</currentDateContext.Provider>
	);
}

export function useCurrentDate() {
	const contextVal = useContext(currentDateContext);
	return {
		setMoment: contextVal.set,
		thisMoment: moment(contextVal.data)
	};
}