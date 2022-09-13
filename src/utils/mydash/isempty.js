function isEmpty(value) {
	if (value === null || typeof value === "undefined" || value === undefined) {
		console.log(true);
		return true;
	}
	if (value instanceof Date) {
		return false;
	}
	let out = true;
	const valueType = typeof value;
	const valueInstance = Object.prototype.toString.call(value);
	console.log(valueInstance);
	switch (valueInstance) {
		case '[object Number]':
			break;
		case '[object String]':
			out = value === '';
			break;
		case '[object Object]':
			for (let x in value) { out = false; }
			break;
		case '[object Array]':
			out = Object.keys(value).length === 0;
			console.log(value && Object.keys(value).length === 0);
			break;
		case '[object Map]':
		case '[object Set]':
			out = value.length === 0
			break;
	}
	console.log(out);
	return out;
}

isEmpty(new Set([
	["огурец", 500],
	["помидор", 350],
	["лук", 50]
])); // => true
//isEmpty(true); // => true
//isEmpty(1); // => true
//isEmpty([1, 2, 3]); // => false
//isEmpty({ 'a': 1 }); // => false
//isEmpty('123'); // => false
//isEmpty(123); // => true
//isEmpty(''); // => true
//isEmpty(0); // => true
//isEmpty(new Map()); // => true
//isEmpty(new Set()); // => true
/**
 * function isLength(value) {
  return (
    typeof value === "number" &&
    value > -1 &&
    value % 1 === 0 &&
    value <= Number.MAX_SAFE_INTEGER
  );
}

function isNil(value) {
  return value === null || value === undefined;
}

function isArrayLike(value) {
  return !isNil(value) && typeof value !== "function" && isLength(value.length);
}

function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}

function getTag(value) {
  if (value === null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  return toString.call(value);
}

const objectProto = Object.prototype;
function isPrototype(value) {
  const ctor = value && value.constructor;
  const proto = (typeof ctor === "function" && ctor.prototype) || objectProto;

  return value === proto;
}

function isArguments(value) {
  return isObjectLike(value) && getTag(value) === "[object Arguments]";
}

// Реализация лодаша
function isEmpty(value) {
  if (value === null) {
    return true;
  }

  if (
    isArrayLike(value) &&
    (Array.isArray(value) ||
      typeof value === "string" ||
      typeof value.splice === "function" ||
      isBuffer(value) ||
      isTypedArray(value) ||
      isArguments(value))
  ) {
    return !value.length;
  }

  const tag = getTag(value);
  if (tag === "[object Map]" || tag === "[object Set]") {
    return !value.size;
  }

  if (isPrototype(value)) {
    return !Object.keys(value).length;
  }

  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }

  return true;
}

 * 
 */