/*
isEmpty(null); // => true
isEmpty(true); // => true
isEmpty(1); // => true
isEmpty([1, 2, 3]); // => false
isEmpty({ 'a': 1 }); // => false
isEmpty('123'); // => false
isEmpty(123); // => true
isEmpty(''); // => true
isEmpty(0); // => true
*/

function isNumberNull(value) {
    return value === 0;
}

function isNumber(value) {
    return typeof value === 'number';
}

function isNull(value) {
    return value === null;
}

function isBoolean(value) {
    return typeof value === 'boolean';
}

function isEmptyString(value) {
    return value === '';
}
function isUndefined(value) {
    return typeof value === 'undefined';
}
function isEmptyArray(value) {
    return (
        Object.prototype.toString.call(value) === '[object Array]' &&
        Array.isArray(value) &&
        !value.length
    );
}

function isEmptyObject(value) {
    return (
        Object.prototype.toString.call(value) === '[object Object]' &&
        !Object.keys(value).length
    );
}
function isMap(value) {
    if (Object.prototype.toString.call(value) === '[object Map]')
        return !value.size;
}
function isSet(value) {
    if (Object.prototype.toString.call(value) === '[object Set]') {
        return !value.size;
    }
}

export default function isEmpty(value) {
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
