const isContain = (value, property, objectsArray) => { 
	if (!Array.isArray(objectsArray)) { 
		throw Error('Not array');
	}
	const found = objectsArray.find((o) => o[property] === value);
	if (typeof found !== 'undefined') { 
		return true;
	}
	return false;
}
export default isContain;
