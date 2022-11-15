/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
type Indexed<T = unknown> = {
    [key in string]: T;
};

export function isObject(obj: any): boolean {
    if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
        return true;
    }
    return false;
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const key in rhs) {
        try {
            if (isObject(rhs[key])) {
                rhs[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
            } else {
                lhs[key] = rhs[key];
            }
        } catch (e) {
            console.log((e as Error).message);
        }
    }
    return lhs;
}

export default merge;

merge({ a: { b: { a: 2 } }, d: 5 }, { a: { b: { c: 1 } } });
