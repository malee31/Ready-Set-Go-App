import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * @type {Entry[]} Sector
 */

/**
 * @type Entry - An event that can be timed in the app
 * @property {string} id Unique ID for the entry
 * @property {string|undefined} categoryId Unique ID for the category the event belongs to if exists
 * @property {string} title Title of entry. Size limit TBA
 * @property {string} title Description of entry. Size limit TBA
 * @property {number} start Start time in epoch
 * @property {number} end End time in epoch
 */

/**
 * @type Category - Category to group entries under
 * @property {string} id Unique ID for the category
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
	const category = basicInfoObj.categories.find(category => category.id = categoryId);

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
	try {
		const serializedSector = await AsyncStorage.getItem(SECTOR_NAME);
		const sectorData = JSON.parse(serializedSector) || [];
	} catch (err) {
		// Cannot read sector
		return [];
	}
}

export function add(identifier, newEntry) {

}

export function remove(identifier) {

}

export function edit(identifier) {

}