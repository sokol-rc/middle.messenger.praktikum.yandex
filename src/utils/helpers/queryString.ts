type StringIndexed = Record<string, any>;

function queryStringify(data: StringIndexed): string | never {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        const value: any = data[key];
        const endLine = index < keys.length - 1 ? '&' : '';

        if (Array.isArray(value)) {
            const arrayValue = value.reduce<StringIndexed>(
                (resultArr, arrData, indexArr: number) => ({
                    ...resultArr,
                    [`${key}[${indexArr}]`]: arrData,
                }),
                {}
            );

            return `${result}${queryStringify(arrayValue)}${endLine}`;
        }

        if (typeof value === 'object') {
            const objValue = Object.keys(value || {}).reduce<StringIndexed>(
                (resultObj, objKey) => ({
                    ...resultObj,
                    [`${key}[${objKey}]`]: value[objKey],
                }),
                {}
            );

            return `${result}${queryStringify(objValue)}${endLine}`;
        }

        return `${result}${key}=${value}${endLine}`;
    }, '');
}

export default queryStringify;
