type StringIndexed = Record<string, any>;

const obj: StringIndexed = {
  key: 1,
  key2: "test",
  key3: false,
  key4: true,
  key5: [1, 2, 3],
  key6: { a: 1 },
  key7: { b: { d: 2 } }
};

function queryStringify(data: StringIndexed): string | never {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    const value = data[key];
    const endLine = index < keys.length - 1 ? "&" : "";

    if (Array.isArray(value)) {
      const arrayValue = value.reduce<StringIndexed>(
        (result, arrData, index) => ({
          ...result,
          [`${key}[${index}]`]: arrData
        }),
        {}
      );

      return `${result}${queryStringify(arrayValue)}${endLine}`;
    }

    if (typeof value === "object") {
      const objValue = Object.keys(value || {}).reduce<StringIndexed>(
        (result, objKey) => ({
          ...result,
          [`${key}[${objKey}]`]: value[objKey]
        }),
        {}
      );

      return `${result}${queryStringify(objValue)}${endLine}`;
    }

    return `${result}${key}=${value}${endLine}`;
  }, "");
}

export default queryStringify


// type StringIndexed = Record<string, any>;

// const obj: StringIndexed = {
//     key: 1,
//     key2: 'test',
//     key3: false,
//     key4: true,
//     key5: [1, 2, 3],
//     key6: {a: 1},
// 	key7: { b: { d: 2 } },
// };

// function isObject(obj: any): any {
// 	return obj === Object(obj);
// }

// function getNest(obj: any, str: string = ''): any { 

// 	let newStr = ''
// 	Object.entries(obj).forEach(([key, value]) => { 
// 		newStr = str + `[${key}]`;
// 		if (isObject(value)) {
// 			newStr = getNest(value, newStr)			
// 		} else { 
// 			newStr = str + `[${key}]`;
// 		}
// 	})
// 	return newStr
// }
// function getFinalValue(obj: any): any { 
// 	obj
// 	let result: any;
// 	Object.entries(obj).forEach(([key, value]) => { 
// 		if (!isObject(value)) {
// 			result = value	
// 		} else { 
// 			const buffResult = getFinalValue(value)
// 			if (typeof buffResult !== 'undefined') {
// 				result = buffResult
// 			 }
			
// 		}
// 		result
// 	})
// 	return result
// }


// function queryStringify(data: StringIndexed): string | never {
//     if (!isObject(data)) {
//         throw new Error('input must be an object');
//     }
//     const stringified = Object.entries(data)
// 		.map(([key, value]) => {
// 			let str: string = '';
			
// 			if (Array.isArray(value)) {
// 				console.log(value);
				
// 				value.forEach((item, index) => {
// 					str += `${key}[${index}]=${item}&`
// 					console.log(str);
					
// 				})
// 			} else if (isObject(value)) {
// 				let objSecuence = getNest(value);
// 				let finalValue = getFinalValue(value);
// 				objSecuence
// 				str = `${key}${objSecuence}=${finalValue}`
// 			} else { 
// 				str = `${key}=${value}`;
// 			}
			
// 			return str;
// 		})
// 		.join('&');
// 	const result = stringified.replace(/&&/, '&');
// 	result
//     return `${result}`;
 
// }

// export default queryStringify

// queryStringify(obj); // 'key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2'
