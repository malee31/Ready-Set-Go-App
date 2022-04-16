import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

/**
 * @type Sector - A chunk of data separated by months from storage
 * @property {KEY} Where the chunk is stored. Used to resync the sector data
 * @property {Entry[]} data Entries contained in the sector
 */

/**
 * @type Entry - An event that can be timed in the app
 * @property {string} id Unique ID for the entry
 * @property {string|undefined} categoryId Unique ID for the category the event belongs to if exists
 * @property {string} task Title of entry. Size limit TBA
 * @property {number} start Start time in epoch
 * @property {number} end End time in epoch
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

export async function readSector({ year, month }) {
	const SECTOR_NAME = `${year}/${month}`;
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
	return sector;
}

export async function saveSector(sector) {
	// TODO: Error handling
	AsyncStorage.setItem(sector.KEY, JSON.stringify(sector.data));
}

export async function add(newEntry) {
	newEntry.id = uuidv4();
	const sector = await readSector(makeIdentifier(0, 0, newEntry.id));
	sector.data.push(newEntry);
	await saveSector(sector);
	if(newEntry.categoryId) {
		getCategory(newEntry.categoryId).push(newEntry.id);
		await saveCategories();
	}
}

export function remove(identifier) {
	// TODO: Complete
}

export function edit(identifier) {
	// TODO: Complete
}