const searchInObject = (value: string | number, property: string, objectsArray: Array<Record<string, any>>) => { 
	if (!Array.isArray(objectsArray)) { 
		throw Error('Not array');
	}
	const found = objectsArray.find((o) => o[property] === value);
	if (typeof found !== 'undefined') { 
		return true;
	}
	return false;
}
export default searchInObject;
