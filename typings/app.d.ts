declare global {
    export type Nullable<T> = T | null;

    export type Keys<T extends Record<string, unknown>> = keyof T;
	export type Values<T extends Record<string, unknown>> = T[Keys<T>];
	export interface ValidateInputProps {
		validateType: string;
		value: string;
		[x: string | number | symbol]: any;
	}
}

export {};
