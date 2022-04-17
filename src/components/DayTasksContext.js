import React, { createContext, useContext, useEffect, useState } from "react";
import { useCurrentDate } from "./CurrentDateContext";
import { momentSectorRead } from "../utils/storage";

const dayTasksContext = createContext({});

export default function DayTasksProvider({ children }) {
	const { thisMoment } = useCurrentDate();
	const [momentString, setMomentString] = useState(thisMoment.format("L"));
	const [entries, setEntries] = useState([]);
	const [reloaded, setReloaded] = useState(false);
	useEffect(() => {
		const updatedMomentString = thisMoment.format("L");
		if(momentString === updatedMomentString && reloaded) {
			return;
		}

		momentSectorRead(thisMoment, true)
			.then(loadedEntries => {
				setEntries(loadedEntries);
				setReloaded(true);
				setMomentString(updatedMomentString);
			});
	}, [momentString === thisMoment.format("L"), reloaded]);

	const taskValue = {
		reloaded: reloaded,
		reload: () => setReloaded(false),
		entries: reloaded ? entries : []
	};

	return (
		<dayTasksContext.Provider value={taskValue}>
			{children}
		</dayTasksContext.Provider>
	);
}

export function useDayTasks() {
	return useContext(dayTasksContext);
}