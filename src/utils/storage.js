import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

const uuidv4 = uuid.v4;

// Beware of race conditions! One write at a time!

/**
 * @typedef Sector - A chunk of data separated by months from storage
 * @property {KEY} Where the chunk is stored. Used to resync the sector data
 * @property {Entry[]} data Entries contained in the sector
 */

/**
 * @typedef MomentStart
 * @property {number} year Year 1-indexed
 * @property {number} month Month 0-indexed
 * @property {number} day Day of month 1-indexed
 * @property {number} [hour = 0] Hour 0-indexed
 * @property {number} [minute = 0] Minutes 1-indexed
 */

/**
 * @typedef Entry - An event that can be timed in the app
 * @property {string} id Unique ID for the entry
 * @property {string|undefined} categoryId Unique ID for the category the event belongs to if exists
 * @property {string} task Title of entry. Size limit TBA
 * @property {MomentStart} start Start time in epoch
 * @property {MomentStart} end End time in epoch
 */

/**
 * @type Category - Category to group entries under
 * @property {string} id Unique ID for the category
 * @property {string} name Name of category. Size limit TBA
 * @property {Entry[]} entries Entry items under this category
 */

const CATEGORY_KEY = "ALL_CATEGORIES";

const basicInfoObj = {
	loaded: false,
	categories: null
};

export async function basicInfo() {
	if(!basicInfoObj.loaded) {
		try {
			const serializedCategories = await AsyncStorage.getItem(CATEGORY_KEY);
			basicInfoObj.categories = JSON.parse(serializedCategories) || [];
		} catch(err) {
			// Unable to read categories from memory
			basicInfoObj.categories = [];
			await saveCategories();
		}
		basicInfoObj.loaded = true;
	}
	return basicInfoObj;
}

function saveCategories() {
	return AsyncStorage.setItem(CATEGORY_KEY, JSON.stringify(basicInfoObj.categories));
}

export function addCategory(newCategory) {
	// TODO: Validate category data
	basicInfoObj.categories.push(newCategory);
	return saveCategories();
}

export function getCategory(categoryId) {
	return basicInfoObj.categories.find(category => category.id = categoryId);
}

export function makeIdentifier(year, month, id) {
	return {
		year,
		month,
		id
	};
}

let cachedSector = {};

export async function readSector({ year, month }) {
	const SECTOR_NAME = `${year}/${month}`;
	if(SECTOR_NAME === cachedSector.KEY) {
		return cachedSector;
	}
	const sector = {
		KEY: SECTOR_NAME,
		data: []
	};

	try {
		const serializedSector = await AsyncStorage.getItem(SECTOR_NAME);
		const sectorData = JSON.parse(serializedSector);
		if(sectorData) {
			sector.data = sectorData;
		}
	} catch(err) {
		// Cannot read sector
	}
	cachedSector = sector;
	return cachedSector;
}

export async function saveSector(sector) {
	// TODO: Error handling
	AsyncStorage.setItem(sector.KEY, JSON.stringify(sector.data));
}

export async function addEntry(newEntry) {
	newEntry.id = uuidv4();
	const sector = await readSector(makeIdentifier(newEntry.start.year, newEntry.start.month));
	sector.data.push(newEntry)
	sector.data.sort((a, b) => {
		let diff = a.start.hour - b.start.hour;
		if(diff === 0) {
			diff = a.start.minute - b.start.minute;
		}
		if(diff === 0) {
			diff = a.end.hour - b.end.hour;
		}
		if(diff === 0) {
			diff = a.end.minute - b.end.minute;
		}
		if(diff === 0) {
			diff = a.task.localeCompare(b.task);
		}
		return diff;
	});

	await saveSector(sector);
	if(newEntry.categoryId) {
		getCategory(newEntry.categoryId).push(newEntry.id);
		await saveCategories();
	}
}

export function removeEntry(identifier) {
	// TODO: Complete
}

export function editEntry(identifier) {
	// TODO: Complete
}

export async function momentSectorRead(momentInstance, onlySpecificDay) {
	const sector = await readSector({ year: momentInstance.year(), month: momentInstance.month() });
	if(!onlySpecificDay) return sector;
	return sector.data.filter(entry => entry.start.day === momentInstance.date())
}