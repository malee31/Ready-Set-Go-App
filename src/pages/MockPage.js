import React from "react";
import Screen from "../components/Screen";

export default function MockPage(content) {
	return () => (
		<Screen>
			{content}
		</Screen>
	);
};