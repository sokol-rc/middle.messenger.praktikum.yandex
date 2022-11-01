function cloneDeep<T extends object = object>(obj: T) {
	
	// eslint-disable-next-line @typescript-eslint/naming-convention
	return (function _cloneDeep(item: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {


        if (item === null || typeof item !== "object") {
            return item;
        }

        if (item instanceof Date) {
            return new Date(item.valueOf());
		}
		
        if (item instanceof WebSocket ) {
            return item;
        }

        if (item instanceof Array) {
            const copy: Array<any> = [];

            // eslint-disable-next-line no-return-assign
            item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

            return copy;
        }

        if (item instanceof Set) {
            const copy = new Set();

            item.forEach(v => copy.add(_cloneDeep(v)));

            return copy;
        }

        if (item instanceof Map) {
            const copy = new Map();

            item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

            return copy;
        }

        if (item instanceof Object) {
            const copy: any= {};

            // eslint-disable-next-line no-return-assign
            Object.getOwnPropertySymbols(item).forEach(s => (copy[s] = _cloneDeep(item[s as keyof typeof item] as T)));

            // eslint-disable-next-line no-return-assign
            Object.keys(item).forEach(k => (copy[k] = _cloneDeep(item[k as keyof typeof item] as T)));

            return copy;
        }

        throw new Error(`Unable to copy object: ${item}`);
    })(obj);
}

export default cloneDeep
