function isNumberNull(value: any) {
    return value === 0;
}

function isNumber(value: any) {
    return typeof value === 'number';
}

function isNull(value: any) {
    return value === null;
}

function isBoolean(value: any) {
    return typeof value === 'boolean';
}

function isEmptyString(value: any) {
    return value === '';
}
function isUndefined(value: any) {
    return typeof value === 'undefined';
}
function isEmptyArray(value: any) {
    return (
        Object.prototype.toString.call(value) === '[object Array]' &&
        Array.isArray(value) &&
        !value.length
    );
}

function isEmptyObject(value: any) {
    return (
        Object.prototype.toString.call(value) === '[object Object]' &&
        !Object.keys(value).length
    );
}
function isMap(value: any) {
    if (Object.prototype.toString.call(value) === '[object Map]') {
        return !value.size;
	}
	return false;
}
function isSet(value: any) {
    if (Object.prototype.toString.call(value) === '[object Set]') {
        return !value.size;
	}
	return false;
}

export default function isEmpty(value: any) {
    if (
        isNumberNull(value) ||
        isNumber(value) ||
        isNull(value) ||
        isBoolean(value) ||
        isEmptyString(value) ||
        isUndefined(value) ||
        isUndefined(value) ||
        isEmptyArray(value) ||
        isEmptyObject(value) ||
        isMap(value) ||
        isSet(value)
    ) {
        return true;
    }
    return false;
}
